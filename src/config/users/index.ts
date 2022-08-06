import { HiUserGroup } from 'react-icons/hi';
import { RiShieldUserFill } from 'react-icons/ri';
import { RADMIN, RUSUARIO } from '../../utils';
import { UsersConfigInterface } from './interfaces';
export const usersConfig: UsersConfigInterface = {
	administrador: {
		Icon: RiShieldUserFill,
		upperCase: 'Administrador',
		upperCasePlural: 'Administradores',
		lowerCase: 'administrador',
		lowerCasePlural: 'administradores',
		rolid: RADMIN,
		endpoints: {
			getAll: 'administradores/getAdministradores',
			getOne(iduser: string) {
				return `/administradores/getUsuarioByRolAndId/${iduser}/${RADMIN}`;
			},
			count: 'dashboard/getCountAdministradores',
		},
	},
	usuarios: {
		Icon: HiUserGroup,
		upperCase: 'Usuario',
		upperCasePlural: 'Usuarios',
		lowerCase: 'usuario',
		lowerCasePlural: 'usuarios',
		urlViewPage: '/usuarios/estudiantes/ver-estudiante/',
		rolid: RUSUARIO,
		endpoints: {
			getAll: 'administradores/getUsuarios',
			count: 'dashboard/getCountUsuarios',
			getOne(iduser: string) {
				return `/administradores/getUsuarioByRolAndId/${iduser}/${RUSUARIO}`;
			},
			getLastTen: `dashboard/getLastTenUsuarios`,
		},
	},

	endpoints: {
		recoverPass: '/usuarios/recoverPass',
		recuperarPassword: 'usuarios/forgetPass',
		findOne(id: string | number) {
			return `usuarios/${id}`;
		},
		verificarUsuarioCorreoAndToken({ correo, token }) {
			return `usuarios/verificarUsuarioCorreoAndToken/${correo}/${token}`;
		},
		create: '/administradores',
		update(iduser: string | number) {
			return `administradores/putUsuario/${iduser}`;
		},
		delete(iduser: string | number) {
			return `administradores/${iduser}`;
		},
		changePassword(iduser: string | number) {
			return `administradores/changePasswordUser/${iduser}`;
		},
		findByCorreo(email_user: string) {
			return `usuarios/findByCorreo/${email_user}`;
		},
		findByIdentificacion(identificacion: string) {
			return `usuarios/findByIdentificacion/${identificacion}`;
		},
		borrarFotoPerfil: 'perfil/BorrarFotoPerfil',
		eliminarCuenta: 'perfil/eliminarCuenta',
		changePasswordPerfil: 'perfil/changePasswordPerfil',
		putPerfil: 'perfil/putPerfil',
		changeFotoPerfi: '/perfil/changeFotoPerfil',
		findUsersIdiomaCursoByIdiomaid(
			ididioma: number | string,
			cohorteid: number | string
		) {
			return `cursos/findUsersIdiomaCursoByIdiomaid/${ididioma}/${cohorteid}`;
		},
		findUsersIdiomaCursoByNivelid(
			nivelid: number | string,
			cohorteid: number | string
		) {
			return `cursos/findUsersIdiomaCursoByNivelid/${nivelid}/${cohorteid}`;
		},

		findUsersIdiomaCursoBySeccionid(
			seccionid: number | string,
			cohorteid: number | string
		) {
			return `cursos/findUsersIdiomaCursoBySeccionid/${seccionid}/${cohorteid}`;
		},

		findUsersIdiomaCursoByHorarioid(
			horarioid: number | string,
			cohorteid: number | string
		) {
			return `cursos/findUsersIdiomaCursoByHorarioid/${horarioid}/${cohorteid}`;
		},
	},
};
