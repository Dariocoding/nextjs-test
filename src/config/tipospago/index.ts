import { FaWallet } from 'react-icons/fa';

export const tipoPagoConfig = {
	Icon: FaWallet,
	upperCase: 'Tipo Pago',
	upperCasePlural: 'Tipos Pago',
	lowerCase: 'tipo pago',
	lowerCasePlural: 'tipos pago',
	url: '/settings/tipos-pago',
	endpoints: {
		getAll: 'tipos-pago',
		create: 'tipos-pago',
		getOne(idtipopago: string | number) {
			return `tipos-pago/${idtipopago}`;
		},
		update(idtipopago: string | number) {
			return `tipos-pago/${idtipopago}`;
		},
		delete(idtipopago: string | number) {
			return `tipos-pago/${idtipopago}`;
		},
		findTiposPagoByMes(year: string | number, mes: string | number) {
			return `dashboard/findTiposPagoByMes/${year}/${mes}`;
		},
	},
};
