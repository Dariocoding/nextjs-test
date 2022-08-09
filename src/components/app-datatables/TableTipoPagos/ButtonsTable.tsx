import { Button } from '@/components/@common/Buttons';
import { Dropdown } from '@/components/@common/Dropdown';
import { BsThreeDotsVertical } from '@/components/Icons/bs/BsThreeDotsVertical';
import { FaPen } from '@/components/Icons/fa/FaPen';
import { FaTrash } from '@/components/Icons/fa/FaTrash';
import * as React from 'react';
import { TipoPagoType } from '../../../config/tipospago/interfaces';

interface IButtonsTableTiposPagoProps {
	el: TipoPagoType;
	eliminarTipoPago(idtipopago: number): void;
	editarTipoPago(idtipopago: number): void;
}

const ButtonsTableTiposPago: React.FC<IButtonsTableTiposPagoProps> = props => {
	const handleDelete = () => props.eliminarTipoPago(props.el.idtipopago);
	const handleEdit = () => props.editarTipoPago(props.el.idtipopago);

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
						<Button
							variant="primary"
							className="mb-2"
							onClick={handleEdit}
						>
							<FaPen className="mr-1" /> Editar Tipo Pago
						</Button>

						<Button variant="danger" onClick={handleDelete}>
							<FaTrash className="mr-1" /> Borrar Tipo
							Pago
						</Button>
					</React.Fragment>
				)}
			/>
		</div>
	);
};

export default ButtonsTableTiposPago;
