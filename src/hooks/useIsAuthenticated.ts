import { useRouter } from 'next/router';
import * as React from 'react';
import { useAuthContext } from '../context/AuthState';

const useIsAuthenticated = () => {
	const { autenticado } = useAuthContext();
	const router = useRouter();

	React.useEffect(() => {
		if (autenticado) router.push('/');
	}, [autenticado, router]);
};

export default useIsAuthenticated;
