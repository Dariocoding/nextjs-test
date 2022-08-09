import { IconType } from '@/components/Icons/libs';
import { PagoType } from '../pagos/interfaces';

export interface UserConfigInterface {
	Icon: IconType;
	upperCase: string;
	upperCasePlural: string;
	lowerCase: string;
	lowerCasePlural: string;
	url?: string;
	urlViewPage?: string;
	rolid: number;
	endpoints: {
		getAll: string;
		getOne(iduser: string | number): string;
		count: string;
		getLastTen?: string;
	};
}

export interface UsersConfigInterface {
	administrador: UserConfigInterface;
	usuarios: UserConfigInterface;
	endpoints: {
		recoverPass: string;
		recuperarPassword: string;
		findOne(id: string | number): string;
		verificarUsuarioCorreoAndToken(props: {
			correo: string | string[];
			token: string | string[];
		}): string;
		create: string;
		update(iduser: string | number): string;
		delete(iduser: string | number): string;
		changePassword(iduser: string | number): string;
		borrarFotoPerfil: string;
		eliminarCuenta: string;
		changePasswordPerfil: string;
		putPerfil: string;
		changeFotoPerfi: string;
		findByCorreo(email_user: string): string;
		findByIdentificacion(identificacion: string): string;
		findUsersIdiomaCursoByIdiomaid(
			idiomaid: string | number,
			cohorteid: number | string
		): string;
		findUsersIdiomaCursoByNivelid(
			nivelid: string | number,
			cohorteid: number | string
		): string;
		findUsersIdiomaCursoBySeccionid(
			seccionid: string | number,
			cohorteid: number | string
		): string;
		findUsersIdiomaCursoByHorarioid(
			horarioid: string | number,
			cohorteid: number | string
		): string;
	};
}

export interface PasswordInterface {
	password?: string;
	passwordConfirm?: string;
}

export interface RolType {
	nombrerol: string;
	idrol: number;
}

export interface UserType {
	identificacion?: string;
	iduser?: number;
	password?: string;
	hashedRt?: string;
	nombres?: string;
	apellidos?: string;
	codigo_pais?: string;
	telefono?: string;
	pais?: string;
	isoCodeCountry?: string;
	fecha_nacimiento?: string | Date;
	email_user?: string;
	image_profile?: string;
	direccion?: string;
	date_created?: Date;
	status?: number;
	estadopais?: string;
	rolid?: number;
	rol?: RolType;
	pagos?: PagoType[];
}

export interface UserTypeTable extends UserType {
	options?: JSX.Element;
	fotoperfilHtml?: JSX.Element;
}
