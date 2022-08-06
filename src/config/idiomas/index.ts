import { GiOpenBook } from 'react-icons/gi';

export const idiomasConfig = {
	Icon: GiOpenBook,
	upperCase: 'Idioma',
	upperCasePlural: 'Idiomas',
	lowerCase: 'idioma',
	lowerCasePlural: 'idioma',
	endpoints: {
		create: 'idiomas',
		update(id: string | number) {
			return `idiomas/${id}`;
		},
		uploadIconoIdioma(id: string | number) {
			return `idiomas/uploadIconoIdioma/${id}`;
		},
		getAll: 'idiomas',

		getByCohorteActual: 'idiomas/getIdiomaByCohorteIDActual',

		getIdiomaByCohorteID(idcohorte: string | number) {
			return `idiomas/getIdiomaByCohorteID/${idcohorte}`;
		},

		getOrderCohorteActual: 'settings/getOrderIdiomas',

		setOrderCohorteActual: 'settings/orderIdiomas',

		getIdioma(id: string | number) {
			return `idiomas/getIdioma/${id}`;
		},

		getNivel(id: string | number) {
			return `idiomas/getNivel/${id}`;
		},

		getSeccion(id: string | number) {
			return `idiomas/getSeccion/${id}`;
		},

		getHorario(id: string | number) {
			return `idiomas/getHorario/${id}`;
		},

		deleteIdioma(id: string | number) {
			return `idiomas/deleteidioma/${id}`;
		},

		deleteNivel(id: string | number) {
			return `idiomas/deleteNivel/${id}`;
		},

		deleteSeccion(id: string | number) {
			return `idiomas/deleteSeccion/${id}`;
		},

		deleteHorario(id: string | number) {
			return `idiomas/deleteHorario/${id}`;
		},
	},
};
