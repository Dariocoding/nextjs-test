import { HeadingDataTableProps } from '../../DataTable';

const HeadingTableUsuarios: HeadingDataTableProps[] = [
	{ content: 'ID', field: 'iduser' },
	{ content: 'Foto Perfil', field: 'fotoperfilHtml' },
	{ content: 'Identificación', field: 'identificacion' },
	{ content: 'Nombre', field: 'nombres' },
	{ content: 'Apellido', field: 'apellidos' },
	{ content: 'Correo', field: 'email_user' },
	{ content: 'Teléfono', field: 'telefono' },
	{ content: 'Rol', field: 'rol.nombrerol' },
	{ content: 'Acciones', field: 'options' },
];

export default HeadingTableUsuarios;
