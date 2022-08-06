import * as React from 'react';
import Modal from '../../components/modal';
import { SizeModal } from '../../components/modal/interfaces';

interface IModalStateProps {
	children: React.ReactNode;
}

interface SetModalProps {
	size: SizeModal;
	content: React.ReactNode;
	titulo?: string;
}

interface ModalContextValues {
	cerrarModal?(): void;
	openModal?(): void;
	setShowModal?(value: boolean): void;
	setModal?(values: SetModalProps): void;
	setTitulo?(titulo: string): void;
	setContent?(value: React.ReactNode): void;
}

const ModalContext = React.createContext<ModalContextValues>({});

const ModalState: React.FC<IModalStateProps> = props => {
	const [size, setSizeModal] = React.useState<SizeModal>('md');
	const [showModal, setShowModal] = React.useState(false);
	const [content, setContent] = React.useState(null);
	const [titulo, setTitulo] = React.useState(null);

	const setModal = (data: SetModalProps) => {
		setSizeModal(data.size);
		setContent(data.content);
		setTitulo(data.titulo);
		setShowModal(true);
	};

	const cerrarModal = () => setShowModal(false);
	const openModal = () => setShowModal(true);

	const valuesProvider: ModalContextValues = {
		setModal,
		setTitulo,
		cerrarModal,
		openModal,
		setContent,
	};

	return (
		<ModalContext.Provider value={valuesProvider}>
			<Modal
				size={size}
				showModal={showModal}
				setShowModal={setShowModal}
				titulo={titulo}
			>
				{content}
			</Modal>
			{props.children}
		</ModalContext.Provider>
	);
};
export default ModalState;

export const useModal = () => React.useContext(ModalContext);
