import * as React from 'react';
export const estadosPago = ['Aprobado', 'Cancelado', 'Pendiente', 'Reembolsado'];

export const OptionsEstadosPago = () => (
	<React.Fragment>
		{estadosPago.map(p => (
			<option key={p} value={p}>
				{p}
			</option>
		))}
	</React.Fragment>
);
