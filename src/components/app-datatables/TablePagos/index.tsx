import * as React from 'react';
import { pagosConfig } from '../../../config/pagos';
import { useLoader } from '../../../context/LoaderPageState';
import { useModal } from '../../../context/ModalState';
import useFetch from '../../../hooks/useFetch';
import DataTable, { HeadingDataTableProps } from '../../DataTable';
import clienteAxios from '../../../config/axios';
import { tipoPagoConfig } from '../../../config/tipospago';
import HeadingPagos from './HeadingPagos';
import { usersConfig } from '../../../config/users';
import BotonesPagos from './ButtonsTable';
import BadgeStatusPago from './BadgeStatusPago';
import dayjs from 'dayjs';
import FormularioEditarPago from '../../@forms-app/pago-update';
import ModalUsuarioPerfil from '../../app-modals/UsuarioPerfil';
import { PagoType, PagoTypeTable } from '../../../config/pagos/interfaces';
import { handleError } from '@/utils/handleError';
import { SMONEY } from '@/utils/consts';

interface IDataTablePagosProps {
	urlRequest: string;
	titulo?: React.ReactNode;
	Heading?: HeadingDataTableProps[];
	showPagination?: boolean;
	canSearch?: boolean;
	headerColorTable?: boolean;
}

const DataTablePagos: React.FunctionComponent<IDataTablePagosProps> = props => {
	const { setLoader } = useLoader();
	const { setModal } = useModal();
	const { data, loading, setData } = useFetch<PagoTypeTable[]>(props.urlRequest, []);

	async function editarPago(idpago: number) {
		try {
			setLoader(true, 'Buscando pago...');
			const urlPago = pagosConfig.endpoints.getOne(idpago);
			const urlTiposPago = tipoPagoConfig.endpoints.getAll;

			const [responsePago, responseTiposPago] = await Promise.all([
				clienteAxios(urlPago),
				clienteAxios(urlTiposPago),
			]);

			const updatePago = (pago: PagoType) =>
				setData(data.map(p => (p.idpago === pago.idpago ? pago : p)));

			setModal({
				titulo: 'Editar Pago',
				size: 'md',
				content: (
					<FormularioEditarPago
						tipospago={responseTiposPago.data}
						pago={responsePago.data}
						updatePago={updatePago}
					/>
				),
			});
		} catch (error) {
			handleError(error);
		} finally {
			setLoader(false);
		}
	}

	async function viewUser(iduser: number) {
		try {
			setLoader(true, 'Cargando usuario...');
			const url = usersConfig.endpoints.findOne(iduser);
			const request = await clienteAxios(url);
			setModal({
				content: <ModalUsuarioPerfil persona={request.data} />,
				size: 'md',
				titulo: `Ver ${usersConfig.usuarios.lowerCase}`,
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	function map() {
		return data.map(item => {
			item.montoFormated = item.monto + SMONEY;
			item.options = (
				<BotonesPagos
					pago={item}
					editarPago={editarPago}
					viewUser={viewUser}
				/>
			);
			item.datecreatedFormated = dayjs(item.fecha_cargo).format('DD/MM/YYYY');
			item.badgeStatus = <BadgeStatusPago estadopago={item.status} />;
			item.cohorteString = 'Cohorte: ' + item.cohorteid;
			return item;
		});
	}

	return (
		<DataTable
			data={map()}
			title={props.titulo}
			heading={props.Heading || HeadingPagos}
			showPagination={props.showPagination}
			canSearch={props.canSearch}
			loading={loading}
		/>
	);
};

export default DataTablePagos;
