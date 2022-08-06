import { Badge } from 'react-rainbow-components';
import * as React from 'react';
import { TypeStatusPago } from '../../../config/pagos/interfaces';

interface IBadgeStatusPagoProps {
	estadopago: TypeStatusPago;
}

type Variant =
	| 'warning'
	| 'success'
	| 'error'
	| 'default'
	| 'inverse'
	| 'lightest'
	| 'outline-brand'
	| 'brand';
const BadgeStatusPago: React.FC<IBadgeStatusPagoProps> = ({ estadopago }) => {
	let estado: Variant;

	if (estadopago === 'Aprobado') estado = 'success';
	if (estadopago === 'Cancelado' || estadopago === 'Reembolsado') estado = 'error';
	if (estadopago === 'Pendiente') estado = 'warning';
	const variant: Variant = estado;

	const style = estadopago === 'Aprobado' ? { background: '#009688' } : {};
	return (
		<Badge variant={variant} size={'small'} style={{ ...style, letterSpacing: 1 }}>
			{estadopago}
		</Badge>
	);
};

export default BadgeStatusPago;
