import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
export const handleError = (e: AxiosError, swalMessage?: boolean): void => {
	//@ts-ignore
	if (e.response?.data?.error) {
		if (swalMessage) {
			//@ts-ignore
			Swal.fire(e.response.data.message, '', 'error');
		} else {
			//@ts-ignore
			toast.error(e.response.data.message);
		}
	} else alert('Ha ocurrido un error...');
	console.error('Hubo un error ', e.message);
};
