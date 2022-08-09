import { FaDollarSign } from 'react-icons/fa';

export const pagosConfig = {
	Icon: FaDollarSign,
	upperCase: 'Pago',
	upperCasePlural: 'Pagos',
	lowerCase: 'pago',
	lowerCasePlural: 'pagos',
	endpoints: {
		//create: 'inscripciones',
		updateCature(id: number | string) {
			return `pagos/updateCapture/${id}`;
		},
		getAll: 'pagos',

		exportarPagosExcel(idCohorte: string | number) {
			return `pagos/exportarPagosExcel/${idCohorte}`;
		},
		exportarAllPagosExcel: 'pagos/exportarAllPagosExcel',
		exportarPagoPdf(id: string | number) {
			return `pagos/exportarPagoPdf/${id}`;
		},
		findVentasMesCohorteActual(year: number | string, mes: string | number) {
			return `dashboard/findVentasMesCohorteActual/${year}/${mes}`;
		},
		findVentasAnioCohorteActual(year: number | string) {
			return `dashboard/findVentasAnioCohorteActual/${year}`;
		},
		getPagosByUserId(id: string | number) {
			return `pagos/getPagosByUserId/${id}`;
		},
		getOne(id: string | number | string[]) {
			return `pagos/${id}`;
		},
		verPagoPaypal(idpago: string | number | string[]) {
			return `pagos/verPagoPaypal/${idpago}`;
		},
		updateStatus(id: number | string) {
			return `pagos/updateStatus/${id}`;
		},
		update(id: string | number) {
			return `pagos/${id}`;
		},
		getCountPagos: 'dashboard/getCountPagos',
		getLastTenPagos: 'dashboard/getLastTenPagos',
	},
};
