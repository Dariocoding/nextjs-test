import * as React from 'react';
import { IconType } from 'react-icons';

interface ITabButtonProps {
	tabSelected: number;
	tab: number;
	Icon: IconType;
	setTab(tab: number): void;
	title: React.ReactNode;
	description: React.ReactNode;
}

const TabButton: React.FC<ITabButtonProps> = props => (
	<a
		className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
			props.tabSelected !== props.tab
				? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
				: 'border-transparent'
		}`}
		href="#0"
		onClick={e => {
			e.preventDefault();
			props.setTab(props.tab);
		}}
	>
		<div>
			<div className="font-bold leading-snug tracking-tight mb-1">
				{props.title}
			</div>
			<div className="text-gray-600">{props.description}</div>
		</div>
		<div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
			<props.Icon className="w-3 h-3" color="#000" />
		</div>
	</a>
);

export default TabButton;
