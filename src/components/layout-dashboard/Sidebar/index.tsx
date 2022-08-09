import classNames from 'classnames';
import SidebarItem from './SidebarItem';
import * as React from 'react';
import routesSidebar from './routesSidebar';
import { classItem, classItemInner } from './SidebarItem';
import { useLoader } from '../../../context/LoaderPageState';
import { useAuthContext } from '../../../context/AuthState';
import useWindowSize from '../../../hooks/useWindowSize';
import useRefVisible from '../../../hooks/useRefVisible';
import Image from 'next/image';
import { NextLink } from '@/components/@common/Link';
import { FaSignOutAlt } from 'react-icons/fa';

interface ISidebarProps {
	isOpenedSidebar: boolean;
	setIsOpenedSidebar(value: boolean): void;
}

const classNameLogo = classNames('h-36', 'flex', 'items-center', 'justify-center');

const Sidebar: React.FunctionComponent<ISidebarProps> = props => {
	const { setLoader } = useLoader();
	const { cerrarSesion } = useAuthContext();
	const windowSize = useWindowSize();
	const { ref, isComponentVisible, eventTarget } = useRefVisible();
	const [itemOpen, setItemOpen] = React.useState<string>();
	const { isOpenedSidebar, setIsOpenedSidebar } = props;

	const classNameSidebar = classNames(
		'min-w-[var(--sidebar-width)]',
		'h-screen',
		'fixed',
		'left-0',
		{ ['-left-[var(--sidebar-width)]']: windowSize.width < 768 && !isOpenedSidebar },
		'top-0',
		'bg-slate-800',
		'bg-slate-900',
		'shadow-lg',
		'z-[100]',
		'transition'
	);

	React.useEffect(() => {
		if (ref && windowSize.width < 770 && isComponentVisible && isOpenedSidebar) {
			if (!(eventTarget?.id === 'app-sidebar__toggle')) {
				setIsOpenedSidebar(false);
			}
		}
		// eslint-disable-next-line
	}, [ref, isComponentVisible, windowSize.width, isOpenedSidebar, eventTarget?.classList]);

	const handleLogout = async () => {
		setLoader(true, 'Cerrando sesión...');
		await cerrarSesion();
		setLoader(false);
	};

	return (
		<div
			className={classNameSidebar}
			ref={ref}
			style={{ transition: 'left 0.2s ease, width 0.3s ease' }}
		>
			<div className={classNameLogo}>
				<NextLink href="/">
					<Image
						src="/images/logo.png"
						className="h-12 select-none"
						alt="Logo imagen"
						width={150}
						height={44}
					/>
				</NextLink>
			</div>
			{routesSidebar.map(route => (
				<SidebarItem
					setItemOpen={setItemOpen}
					itemOpen={itemOpen}
					item={route}
					key={route.title}
				/>
			))}

			<div className={classItem} onClick={handleLogout}>
				<div className={classItemInner}>
					<FaSignOutAlt className="mr-1" />
					<span className="select-none font-medium">
						Cerrar Sesión
					</span>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
