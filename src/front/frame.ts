window.onmessage = function (e) {
	const data = JSON.parse(e.data)
	if (data.type == 'new-style') {
		const shadowroot = document.getElementById('shadowroot')?.shadowRoot
		if (!shadowroot) {
			return
		}
		const animation_style = document.createElement('style')
		animation_style.classList.add('transition')
		animation_style.innerHTML = '* {transition: all 200ms;}'
		shadowroot.appendChild(animation_style)
		shadowroot.querySelector('#customStyle')!.innerHTML = data.style
		setTimeout(() => {
			animation_style.remove()
		}, 200)
	}
}

function getHoveredElement(root: HTMLElement) {
	let element: HTMLElement | null = root.querySelector(
		'.has-hover:hover:not(:has(*:hover))',
	)
	return element
}

function getHoveredPath(root: HTMLElement) {
	const path: { element?: string; class: string }[] = []
	const hovered_element = getHoveredElement(root)
	let element = hovered_element
	if (!element) {
		return
	}

	while (element != root) {
		if (!element) {
			break
		}
		const classes = Array.from(element!.classList)
			.filter((e) => e != 'has-hover')
			.map((e) => `.${e}`)
			.join('')
		if (element.tagName == 'DIALOG') {
			break
		}
		if (
			['DIV', 'BUTTON', 'INPUT', 'P'].includes(element.tagName) &&
			classes != ''
		) {
			path.unshift({ class: classes })
		} else {
			path.unshift({ element: element.tagName.toLowerCase(), class: classes })
		}
		element = element.parentNode! as HTMLElement
	}
	// document.dispatchEvent(new CustomEvent('css-path', { detail: { path } }))
	window.parent.postMessage(JSON.stringify({ type: 'css-path-activate', path }))
	const dialog: HTMLElement = root.querySelector('dialog')!
	const csspathTarget: HTMLElement = root.querySelector('.css-path')!
	csspathTarget.innerHTML = `${path.map(({ element, class: cls }) => `<span class="element">${element || ''}</span><span class="class">${cls}</span>`).join('<span> &gt; </span>')}`

	const dialogRect = dialog!.getBoundingClientRect()
	const hoveredRect = hovered_element!.getBoundingClientRect()
	csspathTarget.style.setProperty(
		'bottom',
		`${dialogRect.bottom - hoveredRect.top}px`,
	)
	csspathTarget.style.setProperty(
		'left',
		`${hoveredRect.x - dialog.getBoundingClientRect().x - 1}px`,
	)
}

window.addEventListener('load', (event) => {
	const shadowroot = document.getElementById('shadowroot')!
		.shadowRoot as unknown as HTMLElement
	if (!shadowroot) {
		throw new Error('Shadowroot not found')
	}

	shadowroot.querySelectorAll('* > *').forEach((element) => {
		element.setAttribute('title', 'Click to copy CSS selector')
		element.addEventListener('mouseenter', () => {
			element.classList.add('has-hover') // the class is necessary to differentiate between actual hover and the fake hover given to checkboxes when you hover over their labels
			getHoveredPath(shadowroot)
		})

		element.addEventListener('mouseleave', () => {
			element.classList.remove('has-hover')
			getHoveredPath(shadowroot)
		})

		element.addEventListener('click', (e: Event) => {
			e.stopPropagation()
			const path_container = shadowroot.querySelector('.css-path')!
			shadowroot.querySelectorAll('.copied').forEach((e) => e.remove())

			const blob = new Blob([path_container.textContent || ''], {
				type: 'text/plain',
			})
			const data = [new ClipboardItem({ ['text/plain']: blob })]
			void navigator.clipboard.write(data)

			const checkmark = document.createElement('div')
			checkmark.classList.add('copied')
			checkmark.textContent = '✔ Copied!'
			path_container.appendChild(checkmark)
			e.preventDefault()
			return null
		})
	})
})

document.addEventListener('css-path', (event) => {
	console.log(event)
	const path_container = document.querySelector('.path-display')!
	path_container.innerHTML(
		`${(event.detail.path as string[]).map((segment) => `<span class="class">${segment}</span>`).join('<span>&gt;</span>')}`,
	)
})