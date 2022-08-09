import { toast } from 'react-toastify';
import clienteAxios from '../../../config/axios';
import { Formik, Form } from 'formik';
import { ButtonFormik } from '../../@forms/Button';

import { useModal } from '../../../context/ModalState';
import { pagosConfig } from '../../../config/pagos';
import { InputFormik } from '../../@forms/Input';
import { SelectDefaultFormik } from '../../@forms/select-default';
import { PagoType } from '../../../config/pagos/interfaces';
import { TipoPagoType } from '../../../config/tipospago/interfaces';
import { Table } from '@/components/@common/Table';
import { handleError } from '@/utils/handleError';
import { SMONEY } from '@/utils/consts';
import { OptionsEstadosPago } from '@/utils/estadosPago';
interface IFrmEditarPagoProps {
	pago: PagoType;
	tipospago: TipoPagoType[];
	updatePago(pago: PagoType): void;
}

const FormularioEditarPago: React.FC<IFrmEditarPagoProps> = props => {
	const { cerrarModal } = useModal();
	const { pago, updatePago } = props;

	const INITIAL_VALUES: PagoType = {
		referenciacobro: pago.referenciacobro,
		tipopagoid: pago.tipopagoid,
		status: pago.status,
	};

	async function actualizarPago(values: PagoType) {
		try {
			const url = pagosConfig.endpoints.update(pago.idpago);
			const response = await clienteAxios.put(url, values);
			toast.success(response.data.msg);
			cerrarModal();
			updatePago(response.data.pago);
		} catch (e) {
			handleError(e);
		}
	}

	return (
		<Formik onSubmit={actualizarPago} initialValues={INITIAL_VALUES}>
			<Form>
				<Table
					className="mb-3"
					thead={[]}
					tbody={[
						[{ content: 'No. Pago' }, { content: pago.idpago }],
						[
							{ content: 'Estudiante:' },
							{
								content: `${pago.user.nombres} ${pago.user.apellidos}`,
							},
						],
						[
							{ content: 'Importe total:' },
							{ content: `${pago.monto} ${SMONEY}` },
						],
						[
							{ content: 'Transacción:' },
							{
								content: (
									<InputFormik
										name="referenciacobro"
										placeholder="Referencia Cobro"
									/>
								),
							},
						],
						[
							{ content: 'Tipo Pago:' },
							{
								content: (
									<SelectDefaultFormik name="tipopagoid">
										{props.tipospago.map(
											tp => (
												<option
													key={
														tp.idtipopago
													}
													value={
														tp.idtipopago
													}
												>
													{
														tp.nombre
													}
												</option>
											)
										)}
									</SelectDefaultFormik>
								),
							},
						],
						[
							{ content: 'Estado:' },
							{
								content: (
									<SelectDefaultFormik name="status">
										<OptionsEstadosPago />
									</SelectDefaultFormik>
								),
							},
						],
					]}
					tableHover={false}
				/>

				<ButtonFormik>Actualizar Pago</ButtonFormik>
			</Form>
		</Formik>
	);
};

export default FormularioEditarPago;
