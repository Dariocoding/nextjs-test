import Image from 'next/image';
import * as React from 'react';
import { Tile } from '../Tile';

interface ITile404Props {
	children?: React.ReactNode;
}

const Tile404: React.FunctionComponent<ITile404Props> = props => (
	<Tile headerColor="var(--primary-color)">
		<div className="flex items-center justify-center">
			<Image src={'/images/not-found-tile.png'} width={300} height={300} />
		</div>

		{props.children}
	</Tile>
);

export default Tile404;
