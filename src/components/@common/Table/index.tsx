import classNames from 'classnames';
import * as React from 'react';

export type TheadProps = { content?: React.ReactNode; visible?: boolean; colSpan?: number };
export type TBodyProps = Array<{ content: React.ReactNode; className?: string }>;

interface ITableProps {
	thead: TheadProps[];
	tbody?: TBodyProps[];
	className?: string;
	footer?: React.ReactNode;
	CustomTbody?: React.ReactNode;
	tfoot?: React.ReactNode;
	tableHover?: boolean;
}

export const Table: React.FunctionComponent<ITableProps> = props => {
	const { thead, tbody, footer, tableHover = true } = props;
	const tableClass = classNames([
		'relative',
		'overflow-x-auto',
		'shadow-gray-300',
		'dark:shadow-gray-900',
		'rounded-lg',
		props.className ? props.className : '',
	]);
	return (
		<div className={tableClass}>
			<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-t-lg">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{thead.map(t => (
							<th
								colSpan={t.colSpan}
								scope="col"
								className="px-6 py-3 text-center"
							>
								{t.content}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.CustomTbody ? props.CustomTbody : null}
					{tbody
						? tbody.map(tr => (
								<TrTable tableHover={tableHover}>
									{tr.map(td => (
										<TdTable
											className={
												td.className
											}
										>
											{td.content}
										</TdTable>
									))}
								</TrTable>
						  ))
						: null}
					{tbody && !tbody.length ? (
						<TrTable>
							<TdTable colSpan={thead.length}>
								No hay Datos
							</TdTable>
						</TrTable>
					) : null}
				</tbody>
				{props.tfoot ? <tfoot>{props.tfoot}</tfoot> : null}
			</table>
			{footer}
		</div>
	);
};

interface ITrTableProps {
	children?: React.ReactNode;
	className?: string;
	tableHover?: boolean;
}

export const TrTable: React.FC<ITrTableProps> = props => (
	<tr
		className={classNames(
			'bg-white',
			'border-b',
			'dark:bg-gray-900',
			'dark:border-gray-100',
			{ 'hover:bg-gray-200': props.tableHover },
			{ 'dark:hover:bg-gray-600': props.tableHover },
			props.className
		)}
	>
		{props.children}
	</tr>
);

interface TdTableProps {
	children?: React.ReactNode;
	className?: string;
	colSpan?: number;
	width?: number | string;
}

export const TdTable: React.FC<TdTableProps> = props => (
	<td
		width={props.width}
		colSpan={props.colSpan}
		className={classNames([
			'dark:text-white',
			'px-4',
			'py-4',
			'text-center',
			'font-medium',
			'text-gray-900',
			'border-r',
			'border-b',
			'dark:border-gray-600',
			props.className,
		])}
	>
		{props.children}
	</td>
);
