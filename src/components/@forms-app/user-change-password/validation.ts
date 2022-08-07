import { PasswordInterface } from '../../../config/users/interfaces';

const validarPasswordUser = (valores: PasswordInterface) => {
	const errores: PasswordInterface = {};

	if (valores.password.trim() === '') {
		errores.password = 'La contraseña es obligatoria';
	} else {
		if (valores.password.trim() !== valores.passwordConfirm.trim()) {
			errores.password = 'Las contraseñas no son iguales';
		}

		if (valores.password.trim().length < 6) {
			errores.password = 'La contraseña debe ser de al menos 6 caracteres';
		}
	}

	return errores;
};

export default validarPasswordUser;
