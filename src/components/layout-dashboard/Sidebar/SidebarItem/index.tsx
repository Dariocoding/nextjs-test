import classNames from 'classnames';
import * as React from 'react';
import { useAuthContext } from '../../../../context/AuthState';
import { RouteSidebar } from '../routesSidebar';
import SingleLink from './SingleLink';
import TreeView from './TreeView';

interface ISidebarItemProps {
	itemOpen: string;
	setItemOpen(value: string): void;
	item: RouteSidebar;
}

export const classItem = classNames('py-0', 'text-white', 'cursor-pointer');
export const classItemInner = classNames(
	'py-4',
	'px-4',
	'text-sm',
	'flex',
	'hover:bg-slate-200',
	'hover:text-black',
	'dark:hover:bg-slate-900',
	'dark:text-white',
	'dark:hover:text-white',
	'items-center',
	'font-semibold',
	'transition'
);

export const classActiveItemInner = classNames(
	' ',
	'bg-slate-200',
	'hover:bg-slate-200',
	'dark:bg-slate-900',
	'dark:hover:bg-slate-900',
	'dark:text-white',
	'dark:hover:text-white',
	'text-black',
	'cursor-default',
	'text-sm'
);

const sizeIcon = 20;

const SidebarItem: React.FC<ISidebarItemProps> = props => {
	const { item } = props;
	const { usuario } = useAuthContext();
	const validacion = item.permisos === '*' || item.permisos.includes(usuario?.rol?.idrol);

	if (!validacion) return null;

	return Array.isArray(item.path) || item.subNav ? (
		<TreeView
			Item={item}
			sizeIcon={sizeIcon}
			setSubnav={props.setItemOpen}
			subnav={props.itemOpen}
		/>
	) : (
		<SingleLink Item={item} sizeIcon={sizeIcon} />
	);
};

export default SidebarItem;
