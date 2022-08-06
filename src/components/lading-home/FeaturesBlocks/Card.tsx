import * as React from 'react';
import { IconType } from 'react-icons';

interface IFeatureBlockProps {
	title: React.ReactNode;
	Icon: IconType;
	description: React.ReactNode;
}

const FeatureBlock: React.FunctionComponent<IFeatureBlockProps> = props => (
	<div className="relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded shadow-xl">
		<props.Icon className="w-10 h-10 p-1 -mt-1 mb-2" />
		<h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
			{props.title}
		</h4>
		<p className="text-gray-600 text-center">{props.description}</p>
	</div>
);

export default FeatureBlock;
