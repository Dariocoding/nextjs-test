import { BACKEND_URL } from '@/utils/consts';
import axios from 'axios';
const clienteAxios = axios.create({
	baseURL: BACKEND_URL,
});

export default clienteAxios;
