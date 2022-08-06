export interface TipoPagoType {
	idtipopago?: number;
	nombre?: string;
	titular?: string;
	telefono?: string;
	identificacion?: string;
	nro_cuenta?: string;
	correo?: string;
	showreferencia?: boolean;
	pagos?: any[];
}

export interface TipoPagoTypeTable extends TipoPagoType {
	options?: JSX.Element;
}
