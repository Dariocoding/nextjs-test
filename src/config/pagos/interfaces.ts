import { TipoPagoType } from '../tipospago/interfaces';
import { UserType } from '../users/interfaces';

export type TypeStatusPago = 'Aprobado' | 'Cancelado' | 'Pendiente' | 'Reembolsado';

export interface PagoType {
	idpago?: number;
	userid?: number;
	user?: UserType;
	cohorteid?: number | string;
	tipopago?: TipoPagoType;
	tipopagoid?: number;
	fecha_cargo?: Date;
	monto?: number;
	status?: TypeStatusPago;
	referenciacobro?: string;
	capture?: string;
	detallesPago?: DetallePagoType[];
}

export interface PagoTypeTable extends PagoType {
	options?: React.ReactNode;
	datecreatedFormated?: string;
	montoFormated?: string;
	cohorteString?: string;
	badgeStatus?: React.ReactNode;
}

export interface DetallePagoType {
	id: number;
	pago?: PagoType;
	pagoid: number;
	monto: number;
}
