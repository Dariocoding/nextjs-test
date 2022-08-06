import { HeadingDataTableProps } from '../../DataTable';

const HeadingPagos: HeadingDataTableProps[] = [
	{ content: 'ID', field: 'idpago' },
	{ content: 'Nombre', field: 'user.nombres' },
	{ content: 'Apellido', field: 'user.apellidos' },
	{ content: 'Ref. / Transacción', field: 'referenciacobro' },
	{ content: 'Fecha', field: 'datecreatedFormated' },
	{ content: 'Monto', field: 'montoFormated' },
	{ content: 'Tipo Pago', field: 'tipopago.nombre' },
	{ content: 'Estado', field: 'badgeStatus' },
	{ content: 'Nro Cohorte', field: 'cohorteString' },
	{ field: 'status', visible: false },
	{ content: 'Acciones', field: 'options' },
];

export default HeadingPagos;
