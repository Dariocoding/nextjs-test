import classNames from 'classnames';
import React from 'react';
import ReactPaginate from 'react-paginate';
import { FaChevronLeft } from '../Icons/fa/arrows/FaChevronLeft';
import { FaChevronRight } from '../Icons/fa/arrows/FaChevronRight';

interface IPaginatedItemsProps {
	itemsPerPage: number;
	items: Array<any>;
	setItemOffset(newValue: number): void;
	pageCount: number;
	page: number;
	setPage(value: number): void;
}

const PaginatedItems: React.FC<IPaginatedItemsProps> = props => {
	const { itemsPerPage, items, setItemOffset } = props;

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
		props.setPage(event.selected);
	};

	const classNameButton = classNames([
		'inline-flex',
		'items-center',
		'py-2',
		'px-3',
		'text-sm',
		'font-medium',
		'text-white',
		'rounded-lg',
		'bg-indigo-500',
	]);

	return (
		<ReactPaginate
			nextLabel={
				<span className="flex items-center text-sm text-white select-none ">
					Siguiente
					<FaChevronRight className="ml-1" size={12} />
				</span>
			}
			onPageChange={handlePageClick}
			pageRangeDisplayed={1}
			pageCount={props.pageCount}
			previousLabel={
				<span className="flex items-center text-sm text-white select-none ">
					<FaChevronLeft className="mr-1" size={12} /> Anterior
				</span>
			}
			disabledClassName={'opacity-75 animate-none'}
			renderOnZeroPageCount={null}
			pageClassName="hidden"
			previousClassName={classNameButton + ' hover:animate-bounce-right'}
			nextClassName={classNameButton + ' hover:animate-bounce-left'}
			containerClassName="flex space-x-3 mt-3"
			activeClassName="hidden"
			breakClassName="hidden"
			forcePage={props.page}
		/>
	);
};

export default PaginatedItems;
