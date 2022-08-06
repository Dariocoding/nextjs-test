import * as React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface ITileProps {
	headerColor?: string;
	children?: React.ReactNode;
	className?: string;
}

const tileClass = classNames(
	'relative',
	'bg-slate-100',
	'dark:bg-slate-800',
	'rounded-md',
	'p-4',
	'shadow-xl',
	'mb-4',
	'transition'
);

export const Tile: React.FC<ITileProps> = props => (
	<motion.div
		variants={{
			hidden: { opacity: 0 },
			show: {
				opacity: 1,
				transition: {
					delayChildren: 0.5,
				},
			},
		}}
		initial="hidden"
		animate="show"
	>
		{props.headerColor ? (
			<div
				className={'rounded-t-md mb-0 p-1'}
				style={{ background: props.headerColor }}
			></div>
		) : null}
		<div
			className={
				tileClass +
				(props.headerColor ? 'rounded-t-none' : '') +
				(props.className ? ` ${props.className}` : '')
			}
		>
			{props.children}
		</div>
	</motion.div>
);
