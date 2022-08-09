import { Form, Formik, FormikHelpers } from 'formik';
import * as React from 'react';
import validarFormUsuario from './validation';
import { useAuthContext } from '../../../context/AuthState';
import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { INITIAL_VALUES_USER_PROFILE } from './initial-values';
import { UserType } from '../../../config/users/interfaces';
import { InputFormik } from '@/components/@forms/Input';
import { PhoneInputFormik } from '@/components/@forms/input-phone';
import { SelectDefaultFormik } from '@/components/@forms/select-default';
import { DatePickerFormik } from '@/components/@forms/date-picker';
import { ButtonFormik } from '@/components/@forms/Button';
import { handleError } from '@/utils/handleError';
import { RADMIN } from '@/utils/consts';
import { PaisesOptions } from '@/utils/paises';
import { OptionsEstadosVenezuela } from '@/utils/estados-venezuela';

interface IFormPerfilUserProps {
	url: string;
	rolid?: number;
	method: 'post' | 'put';
	reautenticar?: boolean;
	user?: UserType;
	password?: boolean;
	done?(user: UserType): void;
	resetForm?: boolean;
}

const FormPerfilUser: React.FunctionComponent<IFormPerfilUserProps> = props => {
	const { usuario, usuarioAutenticado } = useAuthContext();
	const INITIAL_VALUES = INITIAL_VALUES_USER_PROFILE(props.user, props.rolid);

	const onSubmit = async (data: typeof INITIAL_VALUES, actions: FormikHelpers<any>) => {
		try {
			const response = await clienteAxios[props.method](props.url, data);
			toast.success(response.data.msg);
			if (props.reautenticar) await usuarioAutenticado();
			if (props.done) props.done(response.data.user);
			if (props.resetForm) actions.resetForm();
		} catch (e) {
			handleError(e);
		}
	};

	return (
		<Formik
			initialValues={
				props.password
					? { ...INITIAL_VALUES, password: '' }
					: INITIAL_VALUES
			}
			onSubmit={onSubmit}
			validate={user => validarFormUsuario(user, props.password)}
		>
			{({ values }) => (
				<Form>
					<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-2">
						<InputFormik
							label="Cédula"
							name="identificacion"
							placeholder="Ingrese el identificacion"
							type={
								usuario.rolid === RADMIN
									? 'text'
									: 'number'
							}
							required
						/>

						<InputFormik
							label="Nombre"
							name="nombres"
							placeholder="Ingrese el nombre"
							required
						/>
					</div>

					<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-2">
						<InputFormik
							label="Apellidos"
							name="apellidos"
							placeholder="Ingrese el apellido"
							required
						/>
						<InputFormik
							label="Correo"
							name="email_user"
							placeholder="Ingrese el correo"
							required
						/>

						<PhoneInputFormik
							label="Teléfono"
							nameInput="telefono"
							nameIsoCode="isoCodeCountry"
							nameSelect="codigo_pais"
							placeholder="Ingresa el telefono"
							required
						/>

						<InputFormik
							label="Direccion"
							name="direccion"
							placeholder="Ingrese su direccion"
						/>

						<SelectDefaultFormik
							label="Pais"
							name="pais"
							required
						>
							<PaisesOptions />
						</SelectDefaultFormik>
						{values.pais === 'Venezuela' ? (
							<SelectDefaultFormik
								label="Estado"
								name="estadopais"
								required
							>
								<OptionsEstadosVenezuela />
							</SelectDefaultFormik>
						) : null}
					</div>

					<DatePickerFormik
						label="Fecha de Nacimiento"
						name="fecha_nacimiento"
					/>

					{props.password ? (
						<InputFormik
							label="Contraseña"
							name="password"
							placeholder="Contraseña"
						/>
					) : null}
					<ButtonFormik>Enviar</ButtonFormik>
				</Form>
			)}
		</Formik>
	);
};

export default FormPerfilUser;
