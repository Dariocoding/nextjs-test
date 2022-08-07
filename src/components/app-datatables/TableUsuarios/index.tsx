import { FaLock, FaPlus, FaRegUserCircle } from 'react-icons/fa';
import { handleError, DeleteInfo } from '../../../utils';
import clienteAxios from '../../../config/axios';
import * as React from 'react';
import { usersConfig } from '../../../config/users';
import { UserConfigInterface, UserType, UserTypeTable } from '../../../config/users/interfaces';
// COMPONENTS
import DataTable from '../../DataTable';
import HeadingTableUsuarios from './Heading';
import MapeoUsuarios from './map-usuarios';
import FormPerfilUser from '../../@forms-app/user-perfil';
import ModalUsuarioPerfil from '../../app-modals/UsuarioPerfil';
import TableLoader from '../../@placeholders/DataTablePlaceholder';
import { HeadingDataTableProps } from '../../DataTable';
// HOOKS
import { useModal } from '../../../context/ModalState';
import { useLoader } from '../../../context/LoaderPageState';
import { Button } from '../../@common';
import FormChangePaswword from '../../@forms-app/user-change-password';

const { endpoints } = usersConfig;

interface IDataTableUsuariosProps {
	urlRequest: string;
	titulo?: React.ReactNode;
	userConfig: UserConfigInterface;
	canSearch?: boolean;
	showPagination?: boolean;
	headerColorTable?: boolean;
	Heading?: HeadingDataTableProps[];
}

const DataTableUsuario: React.FunctionComponent<IDataTableUsuariosProps> = props => {
	const { userConfig } = props;
	const { setLoader } = useLoader();
	const { setModal, cerrarModal } = useModal();
	const [data, setDatos] = React.useState<UserTypeTable[]>([]);
	const [cargando, setCargando] = React.useState(true);

	React.useEffect(() => {
		async function requestUsers() {
			try {
				setCargando(true);
				const response = await clienteAxios(props.urlRequest);
				setDatos(response.data);
			} catch (error) {
			} finally {
				setCargando(false);
			}
		}

		requestUsers();
		// eslint-disable-next-line
	}, [props.urlRequest]);

	async function crearUsuario() {
		const addUser = (user: UserTypeTable) => setDatos([user, ...data]);
		setModal({
			content: (
				<FormPerfilUser
					method="post"
					url={usersConfig.endpoints.create}
					password
					resetForm
					done={addUser}
					rolid={userConfig.rolid}
				/>
			),
			size: 'md',
			titulo: `Crear ${userConfig.lowerCase}`,
		});
	}

	async function editarUsuario(iduser: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = userConfig.endpoints.getOne(iduser);
			const request = await clienteAxios(url);
			const user = request.data as UserType;
			const editUser = (user: UserType) => {
				setDatos(
					data.map(u =>
						u.iduser === user.iduser ? { ...u, ...user } : u
					)
				);
				cerrarModal();
			};

			setModal({
				content: (
					<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-4">
						<div>
							<h4 className="text-center text-2xl font-bold dark:font-medium flex justify-center items-center mb-3 space-x-3">
								<span>Datos Personales</span>{' '}
								<FaRegUserCircle />
							</h4>
							<FormPerfilUser
								user={user}
								url={usersConfig.endpoints.update(
									user.iduser
								)}
								method={'put'}
								done={editUser}
							/>
						</div>
						<div>
							<h4 className="text-center text-2xl font-bold dark:font-medium flex justify-center items-center mb-3 space-x-3">
								<span>Cambiar Contraseña</span>{' '}
								<FaLock />
							</h4>
							<FormChangePaswword
								url={usersConfig.endpoints.changePassword(
									user.iduser
								)}
							/>
						</div>
					</div>
				),
				size: 'xl',
				titulo: `Editar ${userConfig.upperCase}`,
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	function eliminarUsuario(iduser: number) {
		DeleteInfo({
			title: `¿Estás seguro de eliminar este ${userConfig.lowerCase}?`,
			text: 'No serás capz de recuperarlo!',
			urlDelete: endpoints.delete(iduser),
			callback() {
				setDatos(data.filter(d => d.iduser !== iduser));
			},
		});
	}

	async function viewUsuario(iduser: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = userConfig.endpoints.getOne(iduser);
			const request = await clienteAxios(url);

			setModal({
				content: <ModalUsuarioPerfil persona={request.data} />,
				size: 'md',
				titulo: `Ver ${userConfig.upperCase}`,
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	if (cargando) return <TableLoader />;

	const conditionCreate = userConfig.endpoints.getAll === props.urlRequest;
	const Buttons = conditionCreate ? (
		<div className="btn-group">
			{conditionCreate ? (
				<Button className="px-2" variant="primary" onClick={crearUsuario}>
					<FaPlus />
				</Button>
			) : null}
		</div>
	) : null;

	return (
		<DataTable
			data={MapeoUsuarios({
				data,
				eliminarUsuario,
				editarUsuario,
				userConfig,
				viewUsuario,
			})}
			heading={props.Heading || HeadingTableUsuarios}
			loading={cargando}
			title={props.titulo}
			canSearch={props.canSearch}
			headerColor={props.headerColorTable}
			showPagination={props.showPagination}
			buttonHeader={Buttons}
		/>
	);
};

export default DataTableUsuario;
