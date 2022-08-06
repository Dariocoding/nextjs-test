import { getIn } from 'formik';
import * as React from 'react';
import { Tile } from '../@common';
import { TBodyProps, TheadProps, Table } from '../@common';
import HeaderDataTable from './HeaderDataTable';
import TableLoader from '../@placeholders/DataTablePlaceholder';
import PaginatedItems from './PaginatedItems';

export type HeadingDataTableProps = TheadProps & { field: string };
interface IDataTableProps {
	headerColor?: boolean;
	heading: HeadingDataTableProps[];
	data: any[];
	buttonHeader?: React.ReactNode;
	loading: boolean;
	title?: React.ReactNode;
	canSearch?: boolean;
	showPagination?: boolean;
	className?: string;
}

const DataTable: React.FunctionComponent<IDataTableProps> = props => {
	const { data, heading, loading, showPagination = true } = props;
	const itemsPerPage = 10;
	const [q, setQ] = React.useState('');
	const [currentItems, setCurrentItems] = React.useState(data);
	const [pageCount, setPageCount] = React.useState(0);
	const [itemOffset, setItemOffset] = React.useState(0);
	const [page, setPage] = React.useState(0);

	React.useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		const newData = search(data);
		const pageCount = Math.ceil(newData.length / itemsPerPage);
		const currentItems = newData.slice(itemOffset, endOffset);
		const actualPage = pageCount ? page + 1 : 0;
		setCurrentItems(currentItems);
		setPageCount(pageCount);
		if (actualPage > pageCount) {
			const newOffset = ((pageCount - 1) * itemsPerPage) % data.length;
			setItemOffset(newOffset);
			setPage(pageCount - 1);
		}

		// eslint-disable-next-line
	}, [itemOffset, itemsPerPage, data, q]);

	function search(rows: Array<any>) {
		const busqueda = q.toLocaleLowerCase().trim();
		if (!busqueda) return rows;
		return rows.filter(row => {
			return heading.some(h => {
				let value = getIn(row, h.field) as string | number;
				if (typeof value === 'string' || typeof value === 'number') {
					value = value.toString().toLowerCase().trim();
					return value.includes(busqueda);
				}
			});
		});
	}

	if (loading && !data.length) return <TableLoader />;

	const Thead: TheadProps[] = props.heading.map(h => ({ content: h.content }));
	const Tbody: TBodyProps[] = currentItems.map(d => {
		return props.heading.map(h => ({ content: getIn(d, h.field) }));
	});

	return (
		<Tile
			headerColor={props.headerColor ? 'var(--primary-color)' : null}
			className={props.className}
		>
			{props.title}
			<HeaderDataTable
				q={q}
				buttonHeader={props.buttonHeader}
				setQ={setQ}
				canSearch={props.canSearch}
			/>
			<Table
				className="mt-5"
				thead={Thead}
				tbody={Tbody}
				footer={
					showPagination ? (
						<div className="flex flex-col items-center py-3">
							<span className="text-sm text-gray-700 dark:text-gray-400 select-none">
								Showing{' '}
								<span className="font-semibold text-gray-900 dark:text-white mx-1">
									{itemOffset}
								</span>{' '}
								to{' '}
								<span className="font-semibold text-gray-900 dark:text-white mx-1">
									{itemOffset + 10 >
									props.data.length
										? props.data.length
										: itemOffset + 10}
								</span>{' '}
								of{' '}
								<span className="font-semibold text-gray-900 dark:text-white mx-1">
									{props.data.length}
								</span>{' '}
								Entries
							</span>
							<PaginatedItems
								pageCount={pageCount}
								setItemOffset={setItemOffset}
								items={data}
								itemsPerPage={itemsPerPage}
								page={page}
								setPage={setPage}
							/>
						</div>
					) : null
				}
			/>
		</Tile>
	);
};

export default DataTable;
