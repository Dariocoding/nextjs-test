import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import AuthState from '../context/AuthState';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ConfigState from '@/context/ConfigState';
import LoaderPageState from '@/context/LoaderPageState';
import Loader from '@/context/LoaderPageState/Loader';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
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

	return (
		<>
			<Head>
				<title>Mi website</title>
				<meta name="description" content="Descripcion de mi sitio web" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=0.8"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Loader texto="Loading..." loading={loading} />{' '}
			<ToastContainer position="bottom-right" theme="colored" />
			<ConfigState>
				<AuthState>
					<LoaderPageState>
						<Component {...pageProps} />
					</LoaderPageState>
				</AuthState>
			</ConfigState>
		</>
	);
}

export default MyApp;
