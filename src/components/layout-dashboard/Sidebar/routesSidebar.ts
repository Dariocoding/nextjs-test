import { RADMIN } from '@/utils/consts';
import { IconType } from 'react-icons';
import { FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import { pagosConfig } from '../../../config/pagos';

export interface RouteSidebar {
	title: string;
	path?: string | Array<string>;
	pathTreeView?: string;
	Icon: IconType;
	permisos: Array<number> | '*';
	subNav?: Array<{ title: string; path: string }>;
}

const routesSidebar: RouteSidebar[] = [
	{ title: 'Dashboard', path: '/dashboard', Icon: FaTachometerAlt, permisos: '*' },
	{ title: 'Usuarios', path: '/usuarios', Icon: FaUsers, permisos: [RADMIN] },
	{ title: 'Pagos', path: '/pagos', Icon: pagosConfig.Icon, permisos: '*' },
	{ title: 'Configuración', path: '/settings', Icon: FaCogs, permisos: [RADMIN] },
	/* 	
	ESTRUCTURA POR SI SON VARIOS LINKS EN UN SOLO ITEM
	{
		title: 'Usuarios',
		path: ['/usuarios/administradores', '/usuarios/estudiantes'],
		Icon: FaUsers,
		permisos: [RADMIN],
		subNav: [
			{ title: 'Administradores', path: '/usuarios/administradores' },
			{ title: 'Estudiantes', path: '/usuarios/estudiantes' },
		],
	},
	{ title: 'Home', path: '/dashboard', Icon: FaHome, permisos: '*' }, */
];

export default routesSidebar;
