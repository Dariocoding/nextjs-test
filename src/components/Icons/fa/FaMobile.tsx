import { DEFAULT_ICON_SIZE, IconType } from '../libs';

export const FaMobile: IconType = props => (
	<svg
		{...props}
		width={props.size || DEFAULT_ICON_SIZE}
		height={props.size || DEFAULT_ICON_SIZE}
		fill="currentColor"
		viewBox="0 0 384 512"
	>
		<path d="M320 0H64C37.5 0 16 21.5 16 48v416C16 490.5 37.5 512 64 512h256c26.5 0 48-21.5 48-48v-416C368 21.5 346.5 0 320 0zM240 447.1C240 456.8 232.8 464 224 464H159.1C151.2 464 144 456.8 144 448S151.2 432 160 432h64C232.8 432 240 439.2 240 447.1z" />
	</svg>
);