import { useRouter } from 'next/router';
import * as React from 'react';
import { FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { useAuthContext } from '../../../context/AuthState';
import { useLoader } from '../../../context/LoaderPageState';
import { FotoPerfilUser } from '../../../utils';
import { ButtonOutline, Dropdown, NextLink } from '../../@common';

interface IUserMenuProps {}

const UserMenu: React.FunctionComponent<IUserMenuProps> = props => {
	const { setLoader } = useLoader();
	const route = useRouter();
	const { usuario, cerrarSesion } = useAuthContext();

	const handleLogout = async () => {
		setLoader(true);
		await cerrarSesion();
		setLoader(false);
	};
	return (
		<Dropdown
			CustomToggle={() => (
				<div className="flex items-center">
					<div className="w-8 h-8 roundd-lg overflow-hidden mr-2">
						<FotoPerfilUser
							user={usuario}
							width={75}
							height={75}
							className={'rounded-full'}
						/>
					</div>
					<div className="font-semibold text-sm">
						{usuario.nombres}
					</div>
				</div>
			)}
			ContentData={() => (
				<React.Fragment>
					<NextLink href="/profile">
						<ButtonOutline variant="primary" className="mb-3">
							<FaUserEdit />
							<span className="text-sm">Profile</span>
						</ButtonOutline>
					</NextLink>
					<ButtonOutline variant="primary" onClick={handleLogout}>
						<FaSignOutAlt />
						<span className="text-sm">Logout</span>
					</ButtonOutline>
				</React.Fragment>
			)}
		/>
	);
};

export default UserMenu;
