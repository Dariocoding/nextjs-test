import { DEFAULT_ICON_SIZE, IconType } from '../libs';

export const BsThreeDotsVertical: IconType = props => (
	<svg
		{...props}
		width={props.size || DEFAULT_ICON_SIZE}
		height={props.size || DEFAULT_ICON_SIZE}
		fill="currentColor"
		viewBox="0 0 16 16"
	>
		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
	</svg>
);
