import DataTablePagos from '../../app-datatables/TablePagos';
import * as React from 'react';
import { pagosConfig } from '../../../config/pagos';

const TablePagoDashboardAdmin: React.FC = () => (
	<DataTablePagos
		urlRequest={pagosConfig.endpoints.getLastTenPagos}
		canSearch={false}
		showPagination={false}
		titulo={<h5 className="text-xl">Últimos Pagos</h5>}
		Heading={[
			{
				content: 'ID',
				field: 'idpago',
			},
			{
				content: 'Nombre',
				field: 'user.nombres',
			},
			{
				content: 'Apellidos',
				field: 'user.apellidos',
			},
			{
				content: 'Monto',
				field: 'montoFormated',
			},
			{
				content: 'Fecha',
				field: 'datecreatedFormated',
			},
			{
				content: 'Tipo pago',
				field: 'tipopago.nombre',
			},
			{
				content: 'Estado',
				field: 'badgeStatus',
			},
			{
				content: 'Acciones',
				field: 'options',
			},
		]}
	/>
);

export default TablePagoDashboardAdmin;
