import Compressor from 'compressorjs';
import * as React from 'react';
import { FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { usersConfig } from '../../../config/users';
import { useAuthContext } from '../../../context/AuthState';
import { useLoader } from '../../../context/LoaderPageState';
import { File } from '../../../extensions';
import { FotoPerfilUser, handleError, PF } from '../../../utils';

const PhotoProfile: React.FC = () => {
	const { setLoader } = useLoader();
	const { usuarioAutenticado, usuario } = useAuthContext();
	const InputFile = React.useRef<HTMLInputElement>();

	const triggerInputFile = () => InputFile.current.click();

	const onChangeInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length) {
			const files = event.target.files;
			const file = files[0];
			const arrValidacion = ['image/jpeg', 'image/png', 'image/jpg'];

			if (!arrValidacion.includes(file.type)) {
				toast.error('No has seleccionado una imágen');
				return;
			}

			new Compressor(file, {
				quality: 0.8,
				maxWidth: 500,
				async success(file: File) {
					try {
						setLoader(true, 'Subiendo foto de Perfil');
						const formData = new FormData();
						formData.append('file', file, file.name);
						const url = usersConfig.endpoints.changeFotoPerfi;
						const response = await clienteAxios.put(
							url,
							formData,
							{
								headers: {
									'content-type':
										'multipart/form-data', // do not forget this
								},
							}
						);
						file.id = 1;
						file.preview = PF + response.data.image_profile;
						toast.success(response.data.msg);
						await usuarioAutenticado();
					} catch (error) {
						handleError(error);
					} finally {
						setLoader(false);
					}
				},
				error(error) {
					console.log(error);
				},
			});
		}
	};

	/* 	async function handleDeleteFile() {
		try {
			setLoader(true, 'Eliminando foto de perfil...');
			const response = await clienteAxios.delete(
				usersConfig.endpoints.borrarFotoPerfil
			);
			toast.success(response.data.msg);
			await usuarioAutenticado();
		} catch (error) {
			handleError(error);
		} finally {
			setLoader(false);
		}
	} */

	return (
		<div
			className="w-20 h-20 group rounded-full transition cursor-pointer absolute -bottom-9"
			onClick={triggerInputFile}
		>
			<FotoPerfilUser
				user={usuario}
				width={75}
				height={75}
				className="group-hover:brightness-75 rounded-full"
			/>

			<input
				type="file"
				className="hidden"
				ref={InputFile}
				onChange={onChangeInputFile}
			/>
			<div className="opacity-0 rounded-lg group-hover:opacity-100 duration-300 absolute inset-x-0 bottom-0 flex justify-center text-sm bg-gray-200 dark:bg-gray-800 text-black dark:text-white items-center select-none">
				Upload <FaUpload className="ml-1" />
			</div>
		</div>
	);
};

export default PhotoProfile;
