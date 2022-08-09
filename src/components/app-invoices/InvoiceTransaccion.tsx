import { useAuthContext } from '../../context/AuthState';
import React from 'react';
import RenderIf from 'react-rainbow-components/components/RenderIf';
import Image from 'next/image';
import { Table, TrTable, TdTable } from '../@common/Table';
import { Button } from '../@common/Buttons';
import { RADMIN, RUSUARIO } from '@/utils/consts';
import { FaPrint } from '../Icons/fa/FaPrint';
interface IInvoiceTransaccionProps {
	pago: any;
}
const InvoiceTransaccion: React.FunctionComponent<IInvoiceTransaccionProps> = ({ pago }) => {
	const { usuario } = useAuthContext();
	const trs = pago.purchase_units[0];
	const idTransaccion = trs.payments.captures[0].id;
	const fecha = trs.payments.captures[0].create_time;
	const estado = trs.payments.captures[0].status;
	const monto = trs.payments.captures[0].amount.value;
	const moneda = trs.payments.captures[0].amount.currency_code;

	const cl = pago.payer;
	const nombreCliente = cl.name.given_name + ' ' + cl.name.surname;
	const emailCliente = cl.email_address;
	const telCliente = cl.phone ? cl.phone.phone_number.national_number : '';
	const codCiudad = cl.address.country_code;
	const direccion1 = trs.shipping.address.address_line_1;
	const direccion2 = trs.shipping.address.admin_area_2;
	const direccion3 = trs.shipping.address.admin_area_1;
	const codPostal = trs.shipping.address.postal_code;

	// CORREO COMERCIO
	const emailComercio = trs.payee.email_address;
	// DETALLE
	const descripcion = trs.description;
	//const montoDetalle = trs.amount.value;
	// DETALLE MONTOS
	const totalCompra = trs.payments.captures[0].seller_receivable_breakdown.gross_amount.value;
	const comision = trs.payments.captures[0].seller_receivable_breakdown.paypal_fee.value;
	let importeNeto = trs.payments.captures[0].seller_receivable_breakdown.net_amount.value;
	let reembolso = false;
	let importeBruto = 0;
	let comisionPaypal = 0;
	let fechaReembolso = '';
	if (trs.payments.refunds) {
		reembolso = true;
		importeBruto = trs.payments.refunds[0].seller_payable_breakdown.gross_amount.value;
		comisionPaypal = trs.payments.refunds[0].seller_payable_breakdown.paypal_fee.value;
		importeNeto = trs.payments.refunds[0].seller_payable_breakdown.net_amount.value;
		fechaReembolso = trs.payments.refunds[0].update_time;
	}
	return (
		<section id="sPedido" className="invoice">
			<div className="mb-4">
				<Image
					src={'/images/img-paypal.png'}
					alt="PayPal Icon"
					width={150}
				/>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<div>
					<address>
						<strong>Transacción {idTransaccion}</strong>
						<br />
						<br />
						<strong>Fecha:</strong> {fecha}
						<br />
						<strong>Estado:</strong> {estado}
						<br />
						<strong>Importe Bruto:</strong> {monto}
						<br />
						<strong>Moneda:</strong> {moneda}
						<br />
					</address>
				</div>
				<div>
					<address>
						<strong>Enviado por:</strong>
						<br />
						<br />
						<strong>Nombre: </strong>
						{nombreCliente}
						<br />
						<strong>Email: </strong>
						{emailCliente}
						<br />
						<strong>Teléfono:</strong> {telCliente}
						<br />
						<strong>Dirección:</strong> {direccion1}
						<br />
						{direccion2}, {direccion3} {codPostal} <br />
						{codCiudad}
					</address>
				</div>
				<div>
					<strong>Enviado a:</strong>
					<br />
					<br />
					<strong>Email:</strong> {emailComercio}
					<br />
				</div>
			</div>
			{reembolso ? (
				<Table
					thead={[
						{ content: 'Movimiento' },
						{ content: 'Importe Bruto' },
						{ content: 'Comisión' },
						{ content: 'Importe neto' },
					]}
					CustomTbody={
						usuario.rol?.idrol === RUSUARIO ? (
							<TrTable>
								<TdTable>
									{fechaReembolso} Reembolso
									para {nombreCliente}
								</TdTable>
								<TdTable>0.00</TdTable>
								<TdTable>
									{' '}
									- {importeBruto} {moneda}
								</TdTable>
							</TrTable>
						) : (
							<React.Fragment>
								<TrTable>
									<TdTable>
										{fechaReembolso}{' '}
										Reembolso para
										'.nombreCliente
									</TdTable>

									<TdTable>
										- {importeBruto}{' '}
										{moneda}
									</TdTable>

									<TdTable>
										- {comisionPaypal}{' '}
										{moneda}
									</TdTable>

									<TdTable>
										- {importeNeto}{' '}
										{moneda}
									</TdTable>
								</TrTable>
								<TrTable>
									<TdTable>
										{fechaReembolso}{' '}
										Cancelación de la
										comisión de PayPal
									</TdTable>

									<TdTable>
										{comisionPaypal}{' '}
										{moneda}
									</TdTable>

									<TdTable>0.00</TdTable>

									<TdTable>
										- {comisionPaypal}{' '}
										{moneda}
									</TdTable>
								</TrTable>
							</React.Fragment>
						)
					}
				/>
			) : null}

			<Table
				className="my-4"
				thead={[{ content: 'Precio' }, { content: 'Importe' }]}
				CustomTbody={
					<TrTable>
						<TdTable>{descripcion}</TdTable>

						<TdTable>
							{monto} {moneda}
						</TdTable>
					</TrTable>
				}
				tfoot={
					<TrTable>
						<TdTable className="text-right">
							Total de la compra:
						</TdTable>
						<TdTable>
							{monto} {moneda}
						</TdTable>
					</TrTable>
				}
			/>

			<RenderIf isTrue={usuario.rol?.idrol === RADMIN}>
				<Table
					thead={[{ content: 'Detalles del pago', colSpan: 2 }]}
					CustomTbody={
						<React.Fragment>
							<TrTable>
								<TdTable
									width={250}
									className={'text-right'}
								>
									Total de la compra:
								</TdTable>
								<TdTable width={250}>
									{totalCompra} {moneda}
								</TdTable>
							</TrTable>
							<TrTable>
								<TdTable
									width={250}
									className={'text-right'}
								>
									<strong>
										Comisión de PayPal
									</strong>
								</TdTable>
								<TdTable width={250}>
									{comision} {moneda}
								</TdTable>
							</TrTable>
							<TrTable>
								<TdTable
									width={250}
									className={'text-right'}
								>
									<strong>
										Importe Neto
									</strong>
								</TdTable>
								<TdTable width={250}>
									{importeNeto} {moneda}
								</TdTable>
							</TrTable>
						</React.Fragment>
					}
				/>
			</RenderIf>

			<div className="mt-2 flex justify-end">
				<Button variant="success" onClick={() => window.print()}>
					<FaPrint /> Imprimir
				</Button>
			</div>
		</section>
	);
};

export default InvoiceTransaccion;
