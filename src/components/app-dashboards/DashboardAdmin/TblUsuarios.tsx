import * as React from 'react';
import { usersConfig } from '../../../config/users';
import DataTableUsuario from '../../app-datatables/TableUsuarios';

const TableUsuariosDashboardAdmin: React.FC = () => (
	<DataTableUsuario
		userConfig={usersConfig.usuarios}
		urlRequest={usersConfig.usuarios.endpoints.getLastTen}
		canSearch={false}
		showPagination={false}
		headerColorTable={false}
		titulo={<h5 className="text-xl">Últimos Usuarios</h5>}
		Heading={[
			{
				content: 'ID',
				field: 'iduser',
			},
			{
				content: 'Nombres',
				field: 'nombres',
			},
			{
				content: 'Apellidos',
				field: 'apellidos',
			},
			{
				content: '',
				field: 'options',
			},
		]}
	/>
);

/* */

export default TableUsuariosDashboardAdmin;
