import ButtonTableUsuarios from './Buttons';
import { UserConfigInterface, UserTypeTable } from '../../../config/users/interfaces';
import { FotoPerfilUser } from '../../../utils';

interface MapeoUsuariosInterface {
	eliminarUsuario(iduser: number): void;
	editarUsuario(iduser: number): void;
	viewUsuario(iduser: number): void;
	userConfig: UserConfigInterface;
	data: UserTypeTable[];
}

const MapeoUsuarios = ({
	data,
	eliminarUsuario,
	editarUsuario,
	userConfig,
	viewUsuario,
}: MapeoUsuariosInterface) => {
	const newData = data.map(item => {
		item.options = (
			<ButtonTableUsuarios
				el={item}
				eliminarUsuario={eliminarUsuario}
				editarUsuario={editarUsuario}
				viewUsuario={viewUsuario}
				userConfig={userConfig}
			/>
		);

		item.fotoperfilHtml = (
			<FotoPerfilUser
				user={item}
				width={40}
				height={40}
				className={'rounded-full'}
			/>
		);

		return item;
	});
	return newData;
};

export default MapeoUsuarios;
