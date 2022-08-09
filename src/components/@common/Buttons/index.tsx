import classNames from 'classnames';
import * as React from 'react';
import { OptionsColors } from '../../../extensions';

interface IButtonProps {
	type?: 'button' | 'submit' | 'reset';
	variant: OptionsColors | 'default';
	children?: React.ReactNode;
	full?: boolean;
	className?: string;
	large?: boolean;
	disabled?: boolean;
	onClick?(): void;
}

export const Button: React.FC<IButtonProps> = props => {
	const { type = 'button' } = props;
	const classButton = classNames([
		'disabled:cursor-not-allowed',
		{ 'text-white': props.variant !== 'default' },
		{ [`bg-${props.variant}`]: props.variant !== 'default' },
		{ [`hover:bg-${props.variant}Hover`]: props.variant !== 'default' },
		'focus:outline-none',
		'font-medium',
		'rounded-lg',
		{ 'w-full': props.full },
		'text-sm',
		'px-4',
		{ ['py-1.5']: !props.large },
		{ ['py-3']: props.large },
		'text-center',
		'transition',
		'flex',
		'items-center',
		'justify-center',
		'space-x-3',
		props.className,
	]);

	return (
		<button
			type={type}
			disabled={props.disabled}
			className={classButton}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export const ButtonOutline: React.FC<IButtonProps & { textVariant?: boolean }> = props => {
	const { type = 'button' } = props;
	const classButton = classNames([
		{ [`text-${props.variant}`]: props.textVariant },
		'border',
		`border-${props.variant}`,
		`hover:bg-${props.variant}`,
		'hover:text-white',
		{ 'w-full': props.full },
		'focus:outline-none',
		'font-medium',
		'rounded-lg',
		'text-sm',
		'px-4',
		'py-1.5',
		'text-center',
		'transition',
		'flex',
		'items-center',
		'justify-center',
		'space-x-3',
		props.className,
	]);
	return (
		<button
			type={type}
			disabled={props.disabled}
			className={classButton}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};
