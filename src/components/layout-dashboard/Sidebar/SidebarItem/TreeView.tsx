import { useRouter } from 'next/router';
import * as React from 'react';
import { FaChevronDown, FaChevronLeft, FaCircleNotch } from 'react-icons/fa';
import { classActiveItemInner, classItem, classItemInner } from '.';
import { NextLink } from '../../../@common';
import { RouteSidebar } from '../routesSidebar';

interface ITreeViewProps {
	Item: RouteSidebar;
	sizeIcon?: number;
	subnav?: string;
	setSubnav?(stateSubNav: string): void;
}

const TreeView: React.FunctionComponent<ITreeViewProps> = props => {
	const { Item, subnav, setSubnav } = props;
	const router = useRouter();
	function handleChangePage() {
		if (Item.title === subnav) setSubnav('');
		else setSubnav(Item.title);
	}

	const isActive = Item.path.includes(router.pathname);
	const isOpen = Item.title === subnav;

	const pointerEventsNone: React.CSSProperties = { pointerEvents: 'none' };

	return (
		<div className={classItem}>
			<div
				className={
					classItemInner +
					(isActive ? classActiveItemInner : '') +
					' flex justify-between'
				}
				onClick={handleChangePage}
			>
				<span className="flex items-center">
					<Item.Icon className="mr-1" size={props.sizeIcon} />
					<span className="select-none font-medium">
						{Item.title}
					</span>
				</span>

				{Item.title === subnav ? (
					<FaChevronLeft
						className="treeview-indicator"
						style={pointerEventsNone}
					/>
				) : (
					<FaChevronDown
						className="treeview-indicator"
						style={pointerEventsNone}
					/>
				)}
			</div>

			<ul
				className={`py-0 text-white cursor-pointer transition-all ${
					isOpen ? 'scale-100' : 'scale-0 max-h-0'
				}`}
			>
				{Item.subNav.map(subMenuItem => (
					<li key={subMenuItem.title}>
						<NextLink
							className={`flex items-center p-3 text-xs 
                        text-white
                        hover:bg-slate-300
                        hover:text-black
                        dark:bg-slate-700
                        dark:hover:bg-slate-900
                        dark:text-white
                        dark:hover:text-white
                        font-medium
                        transition
                        select-none
                     `}
							href={subMenuItem.path}
						>
							<FaCircleNotch className="mr-1" />
							{subMenuItem.title}
						</NextLink>
					</li>
				))}
			</ul>
		</div>
	);
};

/* export const classItemInner = classNames(
	'py-4',
	'px-4',
	'text-sm',
	'flex',
	'hover:bg-slate-300',

);

export const classActiveItemInner = classNames(
	' ',
	'bg-slate-300',
	'hover:bg-slate-300',
	'dark:bg-slate-900',
	'dark:hover:bg-slate-900',
	'dark:text-white',
	'dark:hover:text-white',
	'text-black',
	'cursor-default',
	'text-sm' */

export default TreeView;
