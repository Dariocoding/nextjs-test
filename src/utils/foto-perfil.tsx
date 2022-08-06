import * as React from 'react';
import Image from 'next/image';
import { PF } from './consts';
import { UserType } from '@/config/users/interfaces';

interface IFotoPerfilUserProps {
	user: UserType;
	width: number | string;
	height: number | string;
	className?: string;
}

export const FotoPerfilUser: React.FC<IFotoPerfilUserProps> = props => {
	const { user } = props;
	let fotoPerfil = '/images/user-boy.png';
	if (Object.keys(user)) {
		if (user.image_profile) {
			fotoPerfil = PF + user.image_profile;
		}
	}

	return (
		<Image
			src={fotoPerfil}
			width={props.width}
			height={props.height}
			className={props.className}
		/>
	);
};
