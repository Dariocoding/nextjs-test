import * as React from 'react';
import { useAuthContext } from '../../context/AuthState';
import { useRouter } from 'next/router';

interface IPrivateRouteProps {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = props => {
	const router = useRouter();
	const Fallback = props.fallback;
	const { autenticado, usuario, cargando } = useAuthContext();

	React.useEffect(() => {
		if (!autenticado && !cargando) {
			router.push('/');
		}
	}, [autenticado, cargando]);
	if (cargando) return <React.Fragment>{Fallback}</React.Fragment>;

	return <React.Fragment>{props.children}</React.Fragment>;
};

export default PrivateRoute;
