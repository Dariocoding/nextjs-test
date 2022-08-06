import DataTable from '../../DataTable';
import * as React from 'react';
import useFetch from '../../../hooks/useFetch';
import { tipoPagoConfig } from '../../../config/tipospago';
import { HeadingTableTiposPago } from './Heading';
import { Button, Tile } from '../../@common';
import TipoPagoForm from '../../@forms-app/tipoPago';
import { FaPen, FaPlus } from 'react-icons/fa';
import ButtonsTableTiposPago from './ButtonsTable';
import { DeleteInfo, handleError } from '../../../utils';
import clienteAxios from '../../../config/axios';
import { useLoader } from '../../../context/LoaderPageState';
import { RenderIf } from 'react-rainbow-components';
import { TipoPagoType, TipoPagoTypeTable } from '../../../config/tipospago/interfaces';

interface ITableTiposPagoProps {}

type StateForm = 'update' | 'create';

const TableTiposPago: React.FunctionComponent<ITableTiposPagoProps> = props => {
	const { setLoader } = useLoader();
	const [loadingForm, setLoadingForm] = React.useState(false);
	const [stateForm, setStateForm] = React.useState<StateForm>('create');
	const [tipoPagoActual, setTipoPagoActual] = React.useState<TipoPagoType>(null);
	const { data, loading, setData } = useFetch<TipoPagoTypeTable[]>(
		tipoPagoConfig.endpoints.getAll,
		[]
	);

	const setCreateStateForm = () => {
		setStateForm('create');
		setTipoPagoActual(null);
	};

	async function EditarTipoPago(id: number) {
		try {
			setLoader(true);
			setLoadingForm(true);
			const req = await clienteAxios(tipoPagoConfig.endpoints.getOne(id));
			setTipoPagoActual(req.data);
			setStateForm('update');
		} catch (error) {
			handleError(error);
		} finally {
			setLoadingForm(false);
			setLoader(false);
		}
	}

	function EliminarTipoPago(id: number) {
		DeleteInfo({
			title: `¿Estás seguro de eliminar este ${tipoPagoConfig.lowerCase}?`,
			text: 'No serás capz de recuperarlo!',
			urlDelete: tipoPagoConfig.endpoints.delete(id),
			callback() {
				setData(data.filter(d => d.idtipopago !== id));
			},
		});
	}

	const Map = () => {
		return data.map(item => {
			item.options = (
				<ButtonsTableTiposPago
					el={item}
					editarTipoPago={EditarTipoPago}
					eliminarTipoPago={EliminarTipoPago}
				/>
			);
			return item;
		});
	};

	return (
		<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-12">
			<div className="grid col-span-2">
				<DataTable
					heading={HeadingTableTiposPago}
					data={Map()}
					loading={loading}
					buttonHeader={
						<Button
							variant="primary"
							className="px-2"
							onClick={setCreateStateForm}
						>
							<FaPlus />
						</Button>
					}
				/>
			</div>
			<div className="grid col-auto">
				<Tile
					headerColor={
						stateForm === 'create'
							? 'var(--primary-color)'
							: 'var(--info-color)'
					}
				>
					<h4 className="text-center">
						{stateForm === 'create' ? (
							<span className="flex items-center justify-center">
								<span className="text-xl">
									Crear Tipo Pago
								</span>
								<FaPlus className="ml-1" />{' '}
							</span>
						) : (
							<span className="flex items-center justify-center">
								<span className="text-xl">
									Actualizar Tipo Pago
								</span>
								<FaPen className="ml-1" />
							</span>
						)}
					</h4>
					<RenderIf isTrue={stateForm === 'create'}>
						<TipoPagoForm
							tipopago={{}}
							url={tipoPagoConfig.endpoints.create}
							method={'post'}
							done={tipopago =>
								setData([tipopago, ...data])
							}
						/>
					</RenderIf>
					<RenderIf
						isTrue={
							stateForm === 'update' &&
							tipoPagoActual &&
							!loadingForm
						}
					>
						<TipoPagoForm
							tipopago={tipoPagoActual}
							url={tipoPagoConfig.endpoints.update(
								tipoPagoActual?.idtipopago
							)}
							method={'put'}
							done={tipopago => {
								setData(
									data.map(tp =>
										tp.idtipopago ===
										tipopago.idtipopago
											? tipopago
											: tp
									)
								);
							}}
						/>
					</RenderIf>
				</Tile>
			</div>
		</div>
	);
};

export default TableTiposPago;
