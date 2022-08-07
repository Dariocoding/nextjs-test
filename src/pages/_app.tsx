import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import * as React from 'react';
import type { AppProps } from 'next/app';
import DarkModeState from '../context/DarkModeState';
import { useRouter } from 'next/router';
import AuthState from '../context/AuthState';
import { ToastContainer } from 'react-toastify';
import RainbowStateColor from '../context/DarkModeState/RainbowStateColors';
import Loader from '../context/LoaderPageState/Loader';
import LoaderPageState from '../context/LoaderPageState';
import ModalState from '../context/ModalState';
import ConfigState from '../context/ConfigState';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const LayoutDashboard = dynamic(() => import('../components/layout-dashboard'), {
	ssr: false,
	loading: () => <Loader loading texto="" />,
});

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);

	const listAdmin = [
		'/dashboard',
		'/profile',
		'/usuarios',
		'/pagos',
		'/settings',
		'/settings/tipos-pago',
		'/pagos/orden/[id]',
		'/pagos/transaccion/[id]',
	];
	const isDashboard = listAdmin.includes(router.pathname);

	React.useEffect(() => {
		const handleStart = (url: string) => {
			if (url !== router.asPath) setLoading(true);
		};
		const handleComplete = () => {
			setLoading(false);
		};

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	});

	const Page = () =>
		isDashboard ? (
			<LayoutDashboard>
				<Component {...pageProps} />
			</LayoutDashboard>
		) : (
			<Component {...pageProps} />
		);

	return (
		<React.Fragment>
			<Head>
				<title>Mi website</title>
				<meta name="description" content="Descripcion de mi sitio web" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Loader texto="Loading..." loading={loading} />{' '}
			<ToastContainer position="bottom-right" theme="colored" />
			<ConfigState>
				<LoaderPageState>
					<AuthState>
						<DarkModeState>
							<RainbowStateColor>
								<ModalState>
									<Page />
								</ModalState>
							</RainbowStateColor>
						</DarkModeState>
					</AuthState>
				</LoaderPageState>
			</ConfigState>
		</React.Fragment>
	);
}

export default MyApp;
