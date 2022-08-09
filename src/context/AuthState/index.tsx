import AuthReducer from './AuthReducer';
import clienteAxios from '../../config/axios';
import axios from 'axios';
import tokenAuth from '../../config/token';
import { OBTENER_USUARIO, LOGIN_ERROR, CERRAR_SESION, SET_LOCALSTORAGE_AT_RT } from '../types';
import { authConfig } from '../../config/auth';
import { UserType } from '../../config/users/interfaces';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { BACKEND_URL } from '@/utils/consts';

const AuthContext = createContext<AuthInterface>({});

export interface AuthInterface {
	at?: string | null;
	rt?: string | null;
	autenticado?: boolean;
	usuario?: UserType;
	mensaje?: string;
	cargando?: boolean;
	usuarioAutenticado?(): Promise<void>;
	cerrarSesion?(): Promise<void>;
}

const AuthState: React.FC<{ children: React.ReactNode }> = props => {
	const [askingIsAuthenticated, setAskingIsAuthenticated] = useState(false);

	const [state, dispatch] = useReducer(AuthReducer, {
		at: null,
		rt: null,
		autenticado: false,
		usuario: {},
		mensaje: null,
		cargando: true,
	});

	function handleErrorAuth(mensaje?: string) {
		dispatch({
			type: LOGIN_ERROR,
			payload: mensaje,
		});
	}

	useEffect(() => {
		dispatch({
			type: SET_LOCALSTORAGE_AT_RT,
			payload: { at: localStorage.getItem('at'), rt: localStorage.getItem('rt') },
		});
		const token = localStorage.getItem('at');
		if (token) tokenAuth(token);
		usuarioAutenticado();
		// eslint-disable-next-line
	}, []);

	// Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		if (askingIsAuthenticated) return;

		// auth Token
		const at = localStorage.getItem('at');
		const rt = localStorage.getItem('rt');
		if (at) tokenAuth(at);
		// Refresh token

		try {
			if (!rt) return handleErrorAuth();

			setAskingIsAuthenticated(true);
			const urlRefresh = BACKEND_URL + authConfig.endpoints.refresh;
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${rt}`,
			};

			const { data } = await axios.get(urlRefresh, {
				headers,
			});

			if (data.user.status !== 1)
				return handleErrorAuth(
					'Tu cuenta ha sido inactiva temporalmente, comunícate con el soporte'
				);

			const { user, access_token, refresh_token } = data;
			const payload = { usuario: user, at: access_token, rt: refresh_token };
			dispatch({ type: OBTENER_USUARIO, payload });
			localStorage.setItem('at', data.access_token);
			localStorage.setItem('rt', data.refresh_token);
			tokenAuth(data.access_token);
		} catch (error) {
			handleErrorAuth();
		} finally {
			setAskingIsAuthenticated(false);
		}
	};

	// Cierra la sesión del usuario
	const cerrarSesion = async () => {
		localStorage.removeItem('at');
		localStorage.removeItem('rt');
		await clienteAxios.post(authConfig.endpoints.logout);
		dispatch({
			type: CERRAR_SESION,
			payload: 'Se ha cerrado la sesión',
		});
		tokenAuth(null);
	};

	const valuesProvider: AuthInterface = {
		at: state.at,
		rt: state.rt,
		autenticado: state.autenticado,
		usuario: state.usuario,
		mensaje: state.mensaje,
		cargando: state.cargando,
		usuarioAutenticado,
		cerrarSesion,
	};

	return <AuthContext.Provider value={valuesProvider}>{props.children}</AuthContext.Provider>;
};

export default AuthState;

export const useAuthContext = () => useContext(AuthContext);
