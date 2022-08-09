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
	'hover:bg-slate-600',
	'hover:text-white',
	'items-center',
	'font-semibold',
	'transition'
);

export const classActiveItemInner = classNames(
	'py-4',
	'px-4',
	'text-sm',
	'flex',
	'bg-slate-600',
	'hover:bg-slate-600',
	'text-white',
	'cursor-default',
	'text-sm'
);

const sizeIcon = 18;

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
