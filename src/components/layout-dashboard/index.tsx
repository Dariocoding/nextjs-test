import classNames from 'classnames';
import * as React from 'react';

import Sidebar from './Sidebar';
import TopNav from './TopNav';

interface ILayoutDashboardProps {
	children: React.ReactNode;
}

const Layout = classNames('text-slate-900', 'dark:text-slate-100', 'min-h-screen', 'h-full');

const LayoutContent = classNames(
	'md:pl-[var(--sidebar-width)]',
	'bg-slate-300',
	'dark:bg-gray-900',
	'h-full',
	'min-h-screen'
);

const LayoutDashboard: React.FunctionComponent<ILayoutDashboardProps> = props => {
	const [isOpened, setIsOpened] = React.useState(false);
	return (
		<div className={Layout}>
			<Sidebar isOpenedSidebar={isOpened} setIsOpenedSidebar={setIsOpened} />
			<div className={LayoutContent}>
				<TopNav setIsOpened={setIsOpened} />
				{props.children}
			</div>
		</div>
	);
};

export default LayoutDashboard;
