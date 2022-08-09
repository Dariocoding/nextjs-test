import classNames from 'classnames';

export const classDropdown = classNames('relative', 'z-50', 'inline');

export const DropdowToggle = classNames(
	'inline',
	'outline-0',
	'bg-transparent',
	'relative',
	'flex',
	'hover:text-info',
	'transition',
	'cursor-pointer',
	'-z-[10]'
);

export const DropdownBadge = classNames(
	'flex',
	'items-center',
	'justify-center',
	'h-5',
	'rounded-lg',
	'text-sm',
	'ml-1'
);

export const DropdownContent = classNames(
	'absolute',
	'top-0',
	'right-8',
	'w-max',
	'max-w-[200px]',
	'max-h-32',
	'bg-slate-100',
	'shadow-md',
	'rounded-lg',
	'overflow-hidden',
	'origin-top-right',
	'transition-transform',
	'p-3',
	'pt-2',
	'z-[100]'
);

export const DropdownFooter = classNames('text-center', 'p-5');
