import * as React from 'react';

type TabSelect = string;

interface ITabSetProps {
	activeTabName: TabSelect;
	onSelect(value: TabSelect): void;
	children?: React.ReactNode;
	className?: string;
}
interface TabContextValues {
	onSelect?(value: TabSelect): void;
	activeTabName?: TabSelect;
}

const TabContext = React.createContext<TabContextValues>({});

export const TabSet: React.FC<ITabSetProps> = props => (
	<TabContext.Provider
		value={{ activeTabName: props.activeTabName, onSelect: props.onSelect }}
	>
		<div
			className={`border-b border-gray-200 ${
				props.className ? props.className : ''
			}`}
		>
			<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
				{props.children}
			</ul>
		</div>
	</TabContext.Provider>
);

interface ITabProp {
	value: TabSelect;
	children?: React.ReactNode;
}

export const Tab: React.FC<ITabProp> = props => {
	const { activeTabName, onSelect } = React.useContext(TabContext);
	/*  ${activeTabName === props.value ? 'font-bold opacity-100' ? 'opacity-75'} */
	return (
		<li
			className={`mr-2 cursor-pointer rounded-t-lg select-none text-md p-1.5 transition px-2.5
            ${
			activeTabName === props.value
				? 'font-bold opacity-100 text-white bg-indigo-500'
				: 'opacity-75 text-blue-500 hover:text-indigo-900'
		}
            `}
			onClick={() => onSelect(props.value)}
		>
			{props.children}
		</li>
	);
};
