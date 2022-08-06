import { UserType } from '../../../config/users/interfaces';

const validarFormUsuario = (valores: UserType, password?: boolean): Object => {
	let errores: UserType = {};

	if (valores.password?.trim() === '') {
		errores.password = 'La contraseña no puede ir vacía';
	}

	if (!valores.nombres) {
		errores.nombres = 'El nombre es obligatorio';
	}

	if (!valores.apellidos) {
		errores.apellidos = 'El apellido es obligatorio';
	}

	if (!valores.email_user) {
		errores.email_user = 'El correo es obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email_user.trim())) {
		errores.email_user = 'Email no válido';
	}

	if (!valores.identificacion) {
		errores.identificacion = 'La cedula es obligatoria';
	}

	if (!valores.pais) {
		errores.pais = 'El pais es obligatorio';
	}

	if (!valores.codigo_pais) {
		errores.telefono = 'El codigo es obligatorio';
	}

	if (!valores.telefono) {
		errores.telefono = 'El telefono es obligatorio';
	}

	if (password) {
		if (!valores.password) {
			errores.password = 'La contraseña es obligatoria';
		}
	}

	return errores;
};

export default validarFormUsuario;
