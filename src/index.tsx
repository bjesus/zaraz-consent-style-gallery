import { Router } from 'cloudworker-router'
import { TempstreamJSX } from 'tempstream'
import { HTMLResponse } from './html'
import { getStyles, Style } from './styles.js'
import makeConsentModal from './generate-consent'
import makeIframe from './make-iframe'
import { editor } from './editor'

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database
}

const router = new Router<Env>()

async function bigPreview(css = '') {
	return makeIframe(
		{
			id: 'preview',
			'data-controller': 'preview',
		},
		await makeConsentModal(css),
	)
}

async function smallPreview({
	name,
	id,
	css,
	active,
	target_frame = '_top',
}: {
	name: string
	id: number
	css: string
	active: boolean
	target_frame?: string
}) {
	const content = (
		<>
			<div style="margin-bottom: 8px;">{name}: </div>
			<div style="width: calc(1024px / 4); height: calc(768px / 4)">
				{makeIframe(
					{
						width: '1024',
						height: '768',
						style:
							'transform: scale(calc(1 / 4)); transform-origin: top left; pointer-events: none',
					},
					makeConsentModal(css),
				)}
			</div>
		</>
	)
	return (
		<a
			class={['small-preview', { active }]}
			href={`/${id}`}
			data-turbo-frame={target_frame}
			data-turbo-action="advance"
		>
			{content}
		</a>
	)
}

function Thumbnails({
	styles,
	picked_style,
	full_view,
}: {
	styles: Style[]
	picked_style?: number
	full_view: boolean
}) {
	return (
		<nav>
			<ul>
				{styles.map((style) => (
					<li class={{ active: picked_style == style.id }}>
						{smallPreview({
							...style,
							active: picked_style == style.id,
							target_frame: full_view ? '_top' : 'editor',
						})}
					</li>
				))}
			</ul>
		</nav>
	)
}

function Header() {
	return (
		<a class="header" href="/">
			<img src="/logo.svg" width="173" height="56" />
			<div class="title">
				Cloudflare Zaraz
				<br />
				Consent Modal Designer
			</div>
		</a>
	)
}

function Divider() {
	return (
		<div class="divider" data-controller="resizer">
			<div class="dots">
				.<br />.<br />.<br />
			</div>
		</div>
	)
}

router.get('/', async (context) => {
	const styles = await getStyles(context.env.DB)
	return await HTMLResponse({
		title: 'Zaraz CMP Style Gallery',
		body: (
			<div class="main-ui main-ui--only-gallery">
				<Header />
				<Thumbnails styles={styles} full_view={true} />
			</div>
		),
	})
})

router.get('/:id', async (context) => {
	const styles = await getStyles(context.env.DB)
	const active_style = styles.find((e) => e.id == Number(context.params.id))
	return await HTMLResponse({
		title: 'Zaraz CMP Style Gallery',
		body: (
			<div class="main-ui">
				<Header />
				<turbo-frame id="editor" class="">
					{editor(active_style?.css || '')}
				</turbo-frame>
				{bigPreview(active_style?.css)}
				<Divider />
				<Thumbnails
					{...{
						styles,
						picked_style: Number(context.params.id),
						full_view: false,
					}}
				/>
			</div>
		),
		activeCustomStyle: `.fake-consent-modal-container {${active_style?.css}}`,
	})
})

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		return router.handle(request, env, ctx)
	},
}
