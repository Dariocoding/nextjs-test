import { OBTENER_USUARIO, LOGIN_ERROR, CERRAR_SESION, SET_LOCALSTORAGE_AT_RT } from '../types';
import { AuthInterface } from '.';

const authReducer = (state: AuthInterface, action: { type: string; payload?: any }) => {
	switch (action.type) {
		case SET_LOCALSTORAGE_AT_RT:
			return {
				...state,
				at: action.payload.at,
				rt: action.payload.rt,
			};
		case OBTENER_USUARIO:
			return {
				...state,
				autenticado: true,
				usuario: action.payload.usuario,
				cargando: false,
			};
		case CERRAR_SESION:
		case LOGIN_ERROR:
			return {
				...state,
				usuario: {},
				autenticado: false,
				mensaje: action.payload,
				cargando: false,
			};

		default:
			return state;
	}
};

export default authReducer;
