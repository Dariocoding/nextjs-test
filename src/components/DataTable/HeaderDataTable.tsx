import styled from 'styled-components';
import * as React from 'react';
import { FaSearch } from 'react-icons/fa';

const InputContainerBusqueda = styled.div`
	margin-right: 20px;
	.icon {
		position: absolute;
		right: 10px;
		bottom: 15px;
	}
`;

interface IHeaderDataTableProps {
	buttonHeader?: React.ReactNode;
	setQ(value: string): void;
	q: string;
	canSearch?: boolean;
}

const HeaderDataTable: React.FC<IHeaderDataTableProps> = ({
	buttonHeader,
	setQ,
	q,
	canSearch = true,
}) => (
	<div className="flex md:justify-between justify-center flex-col md:flex-row text-center">
		<div className="mb-3">{buttonHeader}</div>

		{canSearch ? (
			<InputContainerBusqueda className="relative">
				<span className="icon">
					<FaSearch />
				</span>
				<input
					className="form-input"
					type="text"
					value={q}
					placeholder="Buscar..."
					onChange={e => setQ(e.target.value)}
				/>
			</InputContainerBusqueda>
		) : null}
	</div>
);

export default HeaderDataTable;
