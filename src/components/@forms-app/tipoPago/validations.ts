import { TipoPagoType } from '../../../config/tipospago/interfaces';

const validarMetodosPago = (valores: TipoPagoType) => {
	let errores: TipoPagoType = {};

	if (valores.nombre.trim() === '') {
		errores.nombre = 'Debe introducir un método de pago.';
	}

	return errores;
};

export default validarMetodosPago;
