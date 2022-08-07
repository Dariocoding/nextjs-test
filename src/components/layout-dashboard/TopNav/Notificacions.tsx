import classNames from 'classnames';
import * as React from 'react';
import { FaBell } from 'react-icons/fa';
import { Dropdown } from '../../@common';

const itemDropDown = classNames([
	'flex',
	'items-center',
	'py-1',
	'px-2',
	'space-x-3',
	'rounded-md',
	'hover:bg-blue-500',
	'hover:text-slate-100',
	'transition-colors',
]);

const Notifications: React.FC = () => {
	return (
		<Dropdown
			CustomToggle={() => (
				<div className="relative">
					<span className="flex h-3 w-3 justify-end absolute -top-2 -right-1">
						<span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-sky-400 opacity-75"></span>
						<span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
					</span>
					<FaBell size={20} />
				</div>
			)}
			ContentData={() => (
				<div className={itemDropDown}>
					<FaBell size={20} />
					<small className="text-sm">
						Curabitur id eros quis nunc suscipit blandit
					</small>
				</div>
			)}
		/>
	);
};

export default Notifications;
