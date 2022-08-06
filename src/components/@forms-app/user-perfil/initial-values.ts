import { UserType } from '../../../config/users/interfaces';
export const INITIAL_VALUES_USER_PROFILE = (user: UserType, rolid?: number) => ({
	nombres: user ? user?.nombres : '',
	apellidos: user ? user?.apellidos : '',
	rolid: user?.rolid ? user.rolid : rolid,
	email_user: user?.email_user ? user?.email_user : '',
	estadopais: user?.estadopais ? user?.estadopais : 'Amazonas',
	telefono: user?.telefono ? user?.telefono : '',
	identificacion: user?.identificacion ? user?.identificacion : '',
	pais: user?.pais ? user?.pais : 'Venezuela',
	codigo_pais: user?.codigo_pais ? user?.codigo_pais : '+58',
	isoCodeCountry: user?.isoCodeCountry ? user?.isoCodeCountry : 've',
	fecha_nacimiento: user?.fecha_nacimiento ? user?.fecha_nacimiento : new Date(),
	direccion: user?.direccion ? user?.direccion : '',
});
