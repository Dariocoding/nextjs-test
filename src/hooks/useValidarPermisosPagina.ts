import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthContext } from '../context/AuthState';

interface PermisosProps {
	rolesPermisos: number[];
	urlReturn: string;
}

const useValidarPermisosPagina = ({ rolesPermisos, urlReturn }: PermisosProps) => {
	const router = useRouter();
	const { usuario } = useAuthContext();

	useEffect(() => {
		if (usuario.rol?.idrol) {
			if (!rolesPermisos.includes(usuario.rol.idrol)) {
				router.push(urlReturn);
			}
		}
		// eslint-disable-next-line
	}, [usuario.rol?.idrol, router]);

	return { usuario };
};

export default useValidarPermisosPagina;
