import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

interface ILoaderProps {
	loading: boolean;
	texto: string;
}

const Loader: React.FunctionComponent<ILoaderProps> = props => {
	if (!props.loading) return null;
	return (
		<div
			className="fixed w-full h-screen flex items-center justify-center bg-slate-900"
			style={{ opacity: 0.9, zIndex: 9999999999999999 }}
		>
			<ImSpinner2 size={60} color={'#fff'} className={'animate-spin-slow'} />
		</div>
	);
};

export default Loader;
