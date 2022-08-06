import * as React from 'react';
export const arrayEstadosVenezuela = [
	'Amazonas',
	'Anzoátegui',
	'Apure',
	'Aragua',
	'Barinas',
	'Bolívar',
	'Carabobo',
	'Cojedes',
	'Delta Amacuro',
	'Distrito Capital',
	'Falcón',
	'Guárico',
	'Lara',
	'Mérida',
	'Miranda',
	'Monagas',
	'Nueva Esparta',
	'Portuguesa',
	'Sucre',
	'Táchira',
	'Trujillo',
	'Vargas',
	'Yaracuy',
	'Zulia',
	'Dependencias Federales',
];

export const OptionsEstadosVenezuela = () => (
	<React.Fragment>
		{arrayEstadosVenezuela.map(estd => (
			<option key={estd} value={estd}>
				{estd}
			</option>
		))}
	</React.Fragment>
);
