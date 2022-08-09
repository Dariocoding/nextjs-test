import { toast } from 'react-toastify';
import { useAuthContext } from '../../../context/AuthState';
import { pagosConfig } from '../../../config/pagos';
import clienteAxios from '../../../config/axios';
import { usersConfig } from '../../../config/users';
import React from 'react';
import { PagoType } from '../../../config/pagos/interfaces';
import { Dropdown } from '@/components/@common/Dropdown';
import { NextLink } from '@/components/@common/Link';
import { Button } from '@/components/@common/Buttons';
import { IDPAGOPAYPAL, RADMIN } from '@/utils/consts';
import { FaEye, FaFilePdf, FaPaypal, FaPen, FaUser } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface IBotonesPagosProps {
	pago: PagoType;
	editarPago(value: number): void;
	viewUser(iduser: number): void;
}

const BotonesPagos: React.FunctionComponent<IBotonesPagosProps> = props => {
	const { usuario } = useAuthContext();
	const { pago } = props;
	const { idpago, tipopago } = pago;
	const handleEditar = () => props.editarPago(idpago);
	const handleViewUser = () => props.viewUser(pago.user.iduser);

	const handleViewPdf = () => {
		toast.promise(GenerarPdf(idpago), {
			pending: 'Descargando PDF',
			success: 'PDF Descargado 👌',
			error: 'Ha ocurrido un error 🤯',
		});
	};

	const urlOrden = `/pagos/orden/${idpago}/`;
	const urlTransaccion = `/pagos/transaccion/${idpago}`;

	return (
		<div className="flex items-center justify-center">
			<Dropdown
				CustomToggle={() => (
					<Button variant={'primary'} className={'px-2'}>
						<BsThreeDotsVertical />
					</Button>
				)}
				ContentData={() => (
					<React.Fragment>
						{usuario.rol?.idrol === RADMIN && (
							<Button
								className="mb-2"
								onClick={handleEditar}
								variant={'primary'}
							>
								<FaPen className="mr-1" /> Editar{' '}
								{pagosConfig.upperCase}
							</Button>
						)}

						<NextLink href={urlOrden}>
							<Button variant={'danger'} className="mb-2">
								<FaEye className="mr-1" /> Ver Orden
							</Button>
						</NextLink>

						{usuario.rol?.idrol === RADMIN ? (
							<Button
								onClick={handleViewUser}
								variant={'primary'}
								className="mb-2"
							>
								<FaUser className="mr-1" /> Ver{' '}
								{usersConfig.usuarios.lowerCase}
							</Button>
						) : null}

						{tipopago.idtipopago === IDPAGOPAYPAL ? (
							<NextLink href={urlTransaccion}>
								<Button
									variant={'primary'}
									className="mb-2"
								>
									<FaPaypal className="mr-1" />{' '}
									Ver Transacción
								</Button>
							</NextLink>
						) : (
							<Button
								disabled={true}
								variant={'danger'}
								className="mb-2 bg-red-300"
							>
								<FaPaypal className="mr-1" /> Ver
								Transacción
							</Button>
						)}

						<Button
							variant={'success'}
							onClick={handleViewPdf}
							className="mb-2"
						>
							<FaFilePdf className="mr-1" /> Generar PDF
						</Button>
					</React.Fragment>
				)}
			/>
		</div>
	);
	({
		/* <Dropdown>








		</Dropdown> */
	});
};

const GenerarPdf = async (id: number) => {
	try {
		const url = pagosConfig.endpoints.exportarPagoPdf(id);
		const response = await clienteAxios.get(url, {
			responseType: 'blob',
		});
		const urlPDF = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = urlPDF;
		link.setAttribute('download', `Pago-${id}.pdf`);
		document.body.appendChild(link);
		link.click();
	} catch (error) {
		console.log(error);
	}
};
export default BotonesPagos;
