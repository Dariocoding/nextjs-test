import * as React from 'react';
import RenderIf from 'react-rainbow-components/components/RenderIf';
import Drawer from 'react-rainbow-components/components/Drawer';
import { useAuthContext } from '../../context/AuthState';
import { useLoader } from '../../context/LoaderPageState';
import Image from 'next/image';
import { Button } from '../@common/Buttons';
import { NextLink } from '../@common/Link';
import { FaArrowRight, FaBars, FaHome, FaSignOutAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
	const [openedDrawer, setOpenedDrawer] = React.useState(false);
	const { setLoader } = useLoader();
	const { autenticado, cerrarSesion } = useAuthContext();

	const handleLogout = async () => {
		setLoader(true, 'Cerrando sesión...');
		await cerrarSesion();
		setLoader(false);
		setOpenedDrawer(false);
	};

	const toggleDrawer = () => setOpenedDrawer(!openedDrawer);
	return (
		<nav className="flex flex-grow">
			<ul className="flex flex-grow justify-end flex-wrap items-center">
				<RenderIf isTrue={autenticado}>
					<li className="hidden md:block">
						<NextLink
							href="/dashboard"
							className="text-gray-900 bg-gray-50 hover:bg-gray-300 ml-3 font-medium btn-sm"
						>
							<span>Dashboard</span>
							<FaHome className="w-3 h-3 fill-current text-gray-500 flex-shrink-0 ml-2 -mr-1" />
						</NextLink>
					</li>
					<li className="hidden md:block">
						<Button variant="default" onClick={handleLogout}>
							<span>Logout</span> <FaSignOutAlt />
						</Button>
					</li>
				</RenderIf>

				<RenderIf isTrue={!autenticado}>
					<li className="hidden md:block">
						<NextLink
							href="/signin"
							className="font-medium text-slate-900 hover:text-slate-700 px-5 py-3 flex items-center transition duration-150 ease-in-out"
						>
							Sign in
						</NextLink>
					</li>

					<li className="hidden md:block">
						<NextLink
							href="/signup"
							className="text-gray-900 bg-gray-50 hover:bg-gray-300 ml-3 font-medium btn-sm"
						>
							<span>Sign up</span>

							<FaArrowRight className="w-3 h-3 fill-current text-gray-500 flex-shrink-0 ml-2 -mr-1" />
						</NextLink>
					</li>
				</RenderIf>

				<li className="block md:hidden">
					<FaBars
						className="cursor-pointer"
						size={25}
						onClick={toggleDrawer}
					/>
				</li>
			</ul>

			<Drawer
				isOpen={openedDrawer}
				slideFrom={'right'}
				onRequestClose={toggleDrawer}
			>
				<Image
					className="h-10"
					src="/images/logo.png"
					alt="Logo empresa"
					quality={100}
					width={150}
					height={44}
					loading={'eager'}
				/>
				<ul className="flex flex-grow flex-col mt-20 justify-center items-center space-y-5">
					<RenderIf isTrue={autenticado}>
						<li>
							<NextLink
								href="/dashboard"
								className="text-gray-900 bg-gray-50 hover:bg-gray-300 ml-3 font-medium btn-sm"
							>
								<span>Dashboard</span>
								<FaHome className="w-3 h-3 fill-current text-gray-500 flex-shrink-0 ml-2 -mr-1" />
							</NextLink>
						</li>
						<li>
							<Button
								variant="default"
								onClick={handleLogout}
							>
								<span>Logout</span> <FaSignOutAlt />
							</Button>
						</li>
					</RenderIf>

					<RenderIf isTrue={!autenticado}>
						<li>
							<NextLink
								href="/signin"
								className="font-medium text-gray-50 hover:text-gray-200 px-5 py-3 flex items-center transition duration-150 ease-in-out"
							>
								Sign in
							</NextLink>
						</li>

						<li>
							<NextLink
								href="/signup"
								className="text-gray-900 bg-gray-50 hover:bg-gray-300 ml-3 font-medium btn-sm"
							>
								<span>Sign up</span>

								<FaArrowRight className="w-3 h-3 fill-current text-gray-500 flex-shrink-0 ml-2 -mr-1" />
							</NextLink>
						</li>
					</RenderIf>
				</ul>
			</Drawer>
		</nav>
	);
};

export default Navbar;
