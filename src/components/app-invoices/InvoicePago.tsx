import { useConfigContext } from '../../context/ConfigState';
import * as React from 'react';
import dayjs from 'dayjs';
import { DetallePagoType, PagoType } from '../../config/pagos/interfaces';
import Image from 'next/image';
import { Button } from '../@common/Buttons';
import { Table, TdTable, TrTable } from '../@common/Table';
import { SMONEY } from '@/utils/consts';
import { FaPrint } from '../Icons/fa/FaPrint';

interface IInvoicePagoProps {
	pago: PagoType;
}

const InvoicePago: React.FunctionComponent<IInvoicePagoProps> = props => {
	const { pago } = props;
	const { user, detallesPago, referenciacobro, tipopago, status, fecha_cargo, monto } = pago;
	const { configuracion } = useConfigContext();
	const fecha = dayjs(fecha_cargo).format('DD/MM/YYYY');

	return (
		<section id="sPedido" style={{ fontSize: '14px' }} className="invoice">
			<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
				<div>
					<h2 className="page-header">
						<Image
							width={150}
							src={'/images/logo.png'}
							alt="Logo"
						/>
					</h2>
				</div>
				<div>
					<p className="text-right block">Fecha: {fecha}</p>
				</div>
			</div>
			<div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-12 mb-8">
				<div>
					Datos Cedees:
					<address>
						<strong>{configuracion.nombre}</strong>
						<br />
						<strong>Tel: </strong> {configuracion.telefono}
						<br />
						<strong>Correo: </strong> {configuracion.correo}
						<br />
						{configuracion.direccion ? (
							<React.Fragment>
								<strong>Dirección: </strong>{' '}
								{configuracion.direccion}
								<br />
							</React.Fragment>
						) : null}
						{configuracion.web ? (
							<a
								target="_blank"
								rel="noreferrer"
								href={configuracion.web}
								className={'text-black'}
							>
								{configuracion.web}
							</a>
						) : null}
					</address>
				</div>
				<div>
					Para:
					<address>
						<strong>
							{user.nombres} {user.apellidos}
						</strong>
						<br />
						<b>Tel:</b> {user.telefono} <br />
						<b>Email:</b> {user.email_user} <br />
					</address>
				</div>
				<div>
					<b>Orden #</b> {pago.idpago} <br />
					<b>Transacción:</b> {referenciacobro}
					<br />
					<b>Estado:</b> {status} <br />
					<b>Monto:</b> {monto + SMONEY}
					<br />
					<b>Tipo Pago:</b> {tipopago.nombre}
					<br />
				</div>
			</div>
			<TableDetalle detalle={detallesPago} total={monto} />
			<RowPrint />
		</section>
	);
};
export default InvoicePago;

const RowPrint: React.FunctionComponent = () => (
	<div className="d-print-none mt-2 flex justify-end">
		<Button variant="success" onClick={() => window.print()} large>
			<FaPrint className="mr-1" /> Imprimir
		</Button>
	</div>
);

interface ITableDetalleProps {
	detalle: DetallePagoType[];
	total: number;
}
const TableDetalle: React.FC<ITableDetalleProps> = props => (
	<Table
		thead={[
			{ content: 'Descripción' },
			{ content: 'Precio' },
			{ content: 'Cantidad' },
			{ content: 'Importe' },
		]}
		CustomTbody={
			<React.Fragment>
				{props.detalle.map(d => (
					<TrDetallePago detalle={d} key={d.id}></TrDetallePago>
				))}
			</React.Fragment>
		}
		tfoot={
			<TrTable>
				<TdTable colSpan={3}>Total:</TdTable>
				<TdTable>
					{props.total}
					{SMONEY}
				</TdTable>
			</TrTable>
		}
	/>
);

interface ITrDetallePagoProps {
	detalle: DetallePagoType;
}

const TrDetallePago: React.FC<ITrDetallePagoProps> = props => {
	props;
	/* const { detalle } = props; */
	/* 	const { horario, monto } = detalle;
	const seccion = horario.seccion;
	const nivel = seccion.nivel;
	const idioma = nivel.idioma; */
	return (
		<TrTable>
			{/* <TdTable>
				<div className="flex justify-center items-center">
					<img
						src={PF + idioma.icono}
						alt={''}
						width={40}
						className={'mr-2 '}
					/>
					{idioma.titulo} - {nivel.descripcion} -{' '}
					{horario.descripcion}
				</div>
			</TdTable>
			<TdTable>{monto + SMONEY}</TdTable>
			<TdTable>1</TdTable>
			<TdTable>{monto + SMONEY}</TdTable> */}
		</TrTable>
	);
};
