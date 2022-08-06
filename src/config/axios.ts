import axios from 'axios';
import { BACKEND_URL } from '../utils';
const clienteAxios = axios.create({
	baseURL: BACKEND_URL,
});

export default clienteAxios;
