import dayjs from 'dayjs';
import Badge from 'react-rainbow-components/components/Badge';
import { UserType } from '../../config/users/interfaces';
import { FotoPerfilUser } from '@/utils/foto-perfil';
import { FaUserCircle } from '../Icons/fa/users/FaUserCircle';
// COMPONENTS

interface IUsuarioPerfilProps {
	persona: UserType;
}

const ModalUsuarioPerfil: React.FC<IUsuarioPerfilProps> = ({ persona }) => {
	const dataPersona = [
		{ label: 'ID', value: persona.iduser },
		{ label: 'Nombres', value: persona.nombres },
		{ label: 'Apellidos', value: persona.apellidos },
		{ label: 'Identificación', value: persona.identificacion },
		{ label: 'Correo', value: persona.email_user },
		{ label: 'Teléfono', value: persona.codigo_pais + '-' + persona.telefono },
		{ label: 'Pais', value: persona.pais },
		{ label: 'Estado pais', value: persona.estadopais },

		{ label: 'Rol', value: persona.rol.nombrerol },
		{
			label: 'Fecha Registro',
			value: dayjs(persona.date_created).format('DD/MM/YYYY'),
		},
		{
			label: 'Fecha de nacimiento',
			value: dayjs(persona.fecha_nacimiento).format('DD/MM/YYYY'),
		},
		{ label: 'Dirección', value: persona.direccion },
	];

	const [variantBadge, textBadge] = (() => {
		let variantBadge: 'warning' | 'success' | 'error';
		let textBadge: string;
		if (persona.status === 0) {
			variantBadge = 'error';
			textBadge = 'Eliminado';
		}
		if (persona.status === 1) {
			variantBadge = 'success';
			textBadge = 'Activo';
		}
		if (persona.status === 2) {
			variantBadge = 'warning';
			textBadge = 'Inactivo';
		}
		return [variantBadge, textBadge];
	})();

	return (
		<div>
			<div className="text-center">
				<FotoPerfilUser
					user={persona}
					className={'rounded-full'}
					width={100}
					height={100}
				/>
			</div>

			<h4 className="text-center">
				{persona.nombres} {persona.apellidos}{' '}
				<Badge
					variant={variantBadge}
					size={'small'}
					style={
						variantBadge === 'success'
							? { background: '#009688' }
							: null
					}
				>
					<b>{textBadge}</b>
				</Badge>
			</h4>

			<h5 className="my-3 text-center flex justify-center items-center space-x-3 text-2xl">
				<span>Datos Personales</span> <FaUserCircle />
			</h5>

			{dataPersona.map(({ label, value }) => (
				<p className="mb-0 text-left" key={label}>
					<b>{label}:</b> {value}
				</p>
			))}
		</div>
	);
};

export default ModalUsuarioPerfil;
