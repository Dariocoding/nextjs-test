import { DEFAULT_ICON_SIZE, IconType } from '../libs';

export const FaPause: IconType = props => (
	<svg
		{...props}
		width={props.size || DEFAULT_ICON_SIZE}
		height={props.size || DEFAULT_ICON_SIZE}
		fill="currentColor"
		viewBox="0 0 320 512"
	>
		<path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
	</svg>
);
