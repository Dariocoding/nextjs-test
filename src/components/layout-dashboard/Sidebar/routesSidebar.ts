import { FaCogs } from '@/components/Icons/fa/FaCogs';
import { FaHome } from '@/components/Icons/fa/FaHome';
import { FaUsers } from '@/components/Icons/fa/users/FaUsers';
import { IconType } from '@/components/Icons/libs';
import { RADMIN } from '@/utils/consts';
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
	{ title: 'Home', path: '/dashboard', Icon: FaHome, permisos: '*' },
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
