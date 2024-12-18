export const defaultStyles = /* HTML */ `<style>
	@layer consent {
		.cf_modal_container {
			position: fixed;
			z-index: 99999999999999999;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			display: grid;
			color: #000;
		}

		dialog::backdrop {
			backdrop-filter: blur(3px);
			background-color: #00000061;
		}

		.title_container {
			display: flex;
			align-items: center;
			margin-bottom: calc(1.5 * var(--padding));
		}

		.title__logo {
			margin-right: 14px;
		}

		.cf_modal {
			--padding: 25px;
			box-sizing: border-box;
			margin: auto;
			font-family: sans-serif;
			border-radius: 4px;
			max-height: calc(100vh - 6.25em);
			max-width: 480px;
			width: calc(100vw - 2 * 1.25em);
			grid-template-rows: min-content min-content min-content 1fr min-content;
			background-color: white;
			padding: var(--padding);
			filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))
				drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));

			overflow-y: auto;
			grid-row: 1/2;
			grid-column: 1/2;
			border: none;
			position: fixed;
		}

		.cf_consent-buttons {
			display: flex;
			flex-flow: row wrap;
			max-width: 50em;
			background-color: #d9d9d9;
			margin: calc(-1 * var(--padding));
			margin-top: 0;
			align-items: center;
			justify-content: flex-end;
			padding: 12px 18px;
			padding-right: 12px;
		}

		.cf_button {
			background-color: #0074d9;
			color: white;
			font-size: 1em;
			padding: 0 16px;
			flex-grow: 1;
			cursor: pointer;
			transition: background-color 200ms;
			margin: 4px;
			border-radius: 5px;
			height: 32px;
			line-height: 32px;
			flex-grow: 0;
		}

		.cf_button:hover {
			background-color: #0082f2;
		}

		.cf_modal h3 {
			font-size: 14px;
			line-height: 1.5em;
			margin: 0;
		}

		.cf_modal h2 {
			font-size: 24px;
			font-weight: 400;
			padding: 0;
			margin: 0;
		}

		@media (max-width: 600px) {
			.cf_modal h2 {
				font-size: 1.5em;
			}
		}

		.cf_consent-container {
			overflow-y: auto;
		}

		.cf_consent-intro {
			font-size: 16px;
			font-weight: 400;
			line-height: 24px;
			text-align: justify;
		}

		.cf_consent-element {
			display: grid;
			grid-template-columns: 15px 1fr;
			grid-column-gap: 12px;
		}

		.cf_consent-element + .cf_consent-element {
			margin-top: var(--padding);
		}

		.cf_consent-element h3 {
			grid-row: 1;
			grid-column: 2;
		}

		.cf_consent-element__checkbox-wrapper {
			grid-row: 1/3;
			grid-column: 1;
			margin: auto;
			margin-top: 0;
			line-height: 1.5em;
			height: 15px;
			width: 15px;
			display: flex;
			flex-flow: row;
			align-items: center;
			justify-content: flex-start;
			padding-top: 2.5px;
			grid-template-rows: 1fr;
			grid-template-columns: 1fr;
		}

		.cf_consent-element p {
			grid-row: 2;
			grid-column: 2;
			font-size: 14px;
			line-height: 21px;
		}

		ul {
			padding: 0;
			padding-right: var(--padding);
			margin: 0;
			margin-right: calc(-1 * var(--padding));
			padding-top: var(--padding);
			padding-bottom: var(--padding);
		}

		p {
			margin: 0;
		}

		button {
			border: none;
		}

		hr {
			margin-top: 24px;
			width: 100%;
			height: 1px;
			border: none;
			background-color: #d9d9d9;
			margin-block-end: 0;
		}
		@media (max-width: 480px) {
			.cf_button {
				flex-grow: 1;
			}

			.cf_consent-buttons {
				padding: 12px;
			}
		}

		@media (max-width: 440px) {
			.cf_modal {
				--padding: 18px;
			}
		}

		@media (max-width: 400px) {
			.cf_modal {
				width: 100vw;
			}
			.cf_consent-intro {
				line-height: 22px;
			}
		}

		@media (prefers-color-scheme: dark) {
			.cf_modal {
				background-color: #222;
				color: #ececec;
			}

			.cf_consent-buttons {
				background-color: #111;
			}
		}

		/* Fix for Safari */
		.cf_modal,
		.cf_modal_container,
		#cf_modal_body,
		.cf_consent-buttons {
			transform: translate3d(0, 0, 0);
			.cf_consent-tcf-element {
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;
			}

			.cf_consent-vendorlist-button {
				background-color: transparent;
				text-decoration: underline;
				cursor: pointer;
				margin-bottom: var(--padding);
			}

			#cf_modal_vendors {
				display: none;
			}

			.cf_consent-vendors-list {
				list-style-type: none;
			}

			.cf_label {
				margin-left: 0.5em;
				font-size: 0.8em;
			}

			.cf_consent-vendor-buttons {
				display: flex;
				flex-wrap: nowrap;
			}

			.cf_consent-vendor-buttons .cf_button {
				margin-top: 0;
				margin-right: 0;
				margin-bottom: 0;
			}

			details > :nth-child(2) {
				padding-left: calc(1 * var(--padding));
				margin-top: calc(var(--padding) / 2);
				font-size: 0.9em;
			}

			details > :nth-child(2) {
				padding-left: calc(var(--padding) * 0.75);
			}

			details > :nth-child(2) > * {
				margin-top: calc(var(--padding) / 2);
			}

			details[data-show=''] {
				display: none;
			}

			.cf_consent-illustrations > * {
				font-size: 0.8em;
			}

			ul.cf_consent-compact {
				padding-top: 0;
				padding-bottom: 0;
			}

			@media (max-width: 480px) {
				.cf_button {
					flex-grow: 1;
				}

				.cf_consent-buttons {
					padding: 12px;
				}
			}

			@media (max-width: 440px) {
				.cf_modal {
					--padding: 18px;
				}
			}

			@media (max-width: 400px) {
				.cf_modal {
					width: 100vw;
				}
				.cf_consent-intro {
					line-height: 22px;
				}
			}
		}
	}
</style> `
