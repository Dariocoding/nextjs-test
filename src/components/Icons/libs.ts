import { SVGProps } from 'react';

export interface IconType extends React.FC<IconTypeProps> {}

export interface IconTypeProps extends SVGProps<SVGSVGElement> {
	size?: number;
}

export const DEFAULT_ICON_SIZE = 16;
