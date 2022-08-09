import * as React from 'react';
import { motion } from 'framer-motion';
import { IModalProps } from './interfaces';
import { FaTimes } from 'react-icons/fa';

const Modal: React.FC<IModalProps> = props => {
	const { showModal, setShowModal } = props;

	React.useEffect(() => {
		const handleEsc = event => {
			if (event.keyCode === 27) {
				setShowModal(false);
			}
		};
		window.addEventListener('keydown', handleEsc);

		return () => {
			window.removeEventListener('keydown', handleEsc);
		};
	}, [setShowModal]);

	let maxWidth: string;

	if (props.size === 'sm') {
		maxWidth = 'max-w-md';
	} else if (props.size === 'md') {
		maxWidth = 'max-w-4xl';
	} else if (props.size === 'xl') {
		maxWidth = 'max-w-7xl';
	} else {
		maxWidth = 'max-w-lg';
	}

	if (!showModal) return null;
	return (
		<div className="modal">
			<motion.div
				className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[200] outline-none focus:outline-none"
				transition={{
					type: 'spring',
					damping: 10,
					stiffness: 90,
				}}
				initial={{ top: -1000 }}
				animate={{ top: 0 }}
				exit={{ x: 0, opacity: 0 }}
			>
				<div
					className={`px-4 w-full py-6 mx-auto h-full overflow-auto ${maxWidth} `}
				>
					{/*content*/}
					<div className="border-0 rounded-lg shadow-lg lg:mt-44 flex flex-col w-full bg-white outline-none focus:outline-none">
						{/*header*/}
						<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
							<h3 className=" text-lg md:text-2xl  font-semibold">
								{props.titulo}
							</h3>
							<button
								className="p-1 ml-auto bg-transparent border-0 text-black opacity-85 float-right text-lg leading-none font-semibold outline-none focus:outline-none"
								onClick={() => setShowModal(false)}
							>
								<span>
									<FaTimes />
								</span>
							</button>
						</div>
						{/*body*/}
						<div className="relative p-6 flex-auto text-lg">
							{props.children}
						</div>
					</div>
				</div>
			</motion.div>
			<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
		</div>
	);
};

export default Modal;
