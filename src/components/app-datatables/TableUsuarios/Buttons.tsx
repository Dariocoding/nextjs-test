import * as React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { UserConfigInterface, UserType } from '../../../config/users/interfaces';
import { useAuthContext } from '../../../context/AuthState';
import { IDSUPERADMINISTRADOR, RADMIN } from '../../../utils';
import { Button, Dropdown } from '../../@common';

interface IButtonTableUsuariosProps {
	el: UserType;
	userConfig: UserConfigInterface;
	eliminarUsuario(iduser: number): void;
	editarUsuario(iduser: number): void;
	viewUsuario(iduser: number): void;
}

const ButtonTableUsuarios: React.FC<IButtonTableUsuariosProps> = props => {
	const { el, eliminarUsuario, editarUsuario, userConfig, viewUsuario } = props;
	const { usuario } = useAuthContext();
	const { iduser } = el;
	const validacion = iduser === IDSUPERADMINISTRADOR || usuario.iduser === iduser;
	if (validacion) return null;

	const validarPermiso =
		usuario.iduser === IDSUPERADMINISTRADOR ||
		(usuario.iduser !== IDSUPERADMINISTRADOR && el.rol.idrol !== RADMIN);

	const handleDelete = () => eliminarUsuario(iduser);
	const handleEdit = () => editarUsuario(iduser);
	const handleView = () => viewUsuario(iduser);
	return validarPermiso ? (
		<div className="flex items-center justify-center">
			<Dropdown
				CustomToggle={() => (
					<Button variant={'primary'} className={'px-2'}>
						<BsThreeDotsVertical />
					</Button>
				)}
				ContentData={() => (
					<React.Fragment>
						<Button
							variant="success"
							className="mb-2"
							onClick={handleView}
						>
							<FaEye className="mr-1" /> Ver{' '}
							{userConfig.upperCase}
						</Button>
						<Button
							variant="primary"
							className="mb-2"
							onClick={handleEdit}
						>
							<FaPen className="mr-1" /> Editar{' '}
							{userConfig.upperCase}
						</Button>

						<Button variant="danger" onClick={handleDelete}>
							<FaTrash className="mr-1" /> Borrar{' '}
							{userConfig.upperCase}
						</Button>
					</React.Fragment>
				)}
			/>
		</div>
	) : null;
};

export default ButtonTableUsuarios;
