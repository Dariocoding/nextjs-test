import { FaSpinner2 } from '@/components/Icons/fa/FaSpinner2';
import * as React from 'react';

interface ILoaderProps {
	loading: boolean;
	texto: string;
}

const Loader: React.FunctionComponent<ILoaderProps> = props => {
	if (!props.loading) return null;
	return (
		<div
			className="fixed w-full h-screen flex items-center justify-center bg-slate-900"
			style={{ opacity: 0.9, zIndex: 999999999999 }}
		>
			<FaSpinner2 size={60} color={'#fff'} className={'animate-spin-slow'} />
		</div>
	);
};

export default Loader;
