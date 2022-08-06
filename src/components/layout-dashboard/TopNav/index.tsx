import classNames from 'classnames';
import * as React from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import ThemeMenu from './ThemeMenu';
import Notifications from './Notificacions';
import UserMenu from './UserMenu';

interface ITopNavProps {
	setIsOpened(value: boolean): void;
}

const classTopNav = classNames('px-5', 'pb-1', 'flex', 'h-[var(--topnav-height)]');

const Search = classNames(
	'relative',
	'h-10',
	'bg-gray-300',
	'dark:bg-gray-900',
	'flex',
	'items-center',
	'rounded-lg',
	'w-full'
);

const InputSearch = classNames(
	'w-full',
	'rounded-lg',
	'bg-gray-100',
	'dark:bg-gray-800',
	'dark:text-white',
	'focus:ring focus:ring-blue-500',
	'border-indigo-600 border',
	'px-5',
	'py-1',
	'text-sm',
	'transition',
	'shadow-indigo-400',
	'shadow-sm',
	'placeholder:italic',
	'placeholder:text-slate-400'
);

const OptsTopNav = classNames('flex', 'items-center', 'p-1', 'space-x-4');

const TopNav: React.FC<ITopNavProps> = props => {
	return (
		<div className={classTopNav}>
			<div className="mt-6 space-y-4 md:space-y-0 w-full flex justify-between flex-col md:flex-row">
				<div className={'flex items-center'}>
					<button
						onClick={() => props.setIsOpened(true)}
						id={'app-sidebar__toggle'}
						className="btn-sm flex items-center p-2 mr-4 dark:focus:bg-slate-700 focus:bg-slate-100 md:hidden"
					>
						<FaBars
							size={20}
							style={{ pointerEvents: 'none' }}
						/>
					</button>
					<div className={Search}>
						<input
							type="text"
							className={InputSearch}
							placeholder="Buscar aqui..."
						/>
						<FaSearch className="absolute right-3" />
					</div>
				</div>
				<div className="flex items-center justify-center">
					<div className={OptsTopNav}>
						<UserMenu />
						<Notifications />
						<ThemeMenu />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TopNav;
