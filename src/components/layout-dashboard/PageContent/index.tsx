import * as React from 'react';
import { IAppTitleProps } from './AppTile';
import classNames from 'classnames';
import PrivateRoute from '../../routes/PrivateRoute';
import DashboardLoader from '../../@placeholders/DashboardPlaceholder';
import dynamic from 'next/dynamic';
import Loader from '@/context/LoaderPageState/Loader';
import TitleAdminPlaceholder from '@/components/@placeholders/TitleAdminPlaceholder';
import ModalState from '@/context/ModalState';

const LayoutDashboard = dynamic(() => import('../index'), {
	ssr: false,
	loading: () => <Loader loading texto="" />,
});

const AppTitle = dynamic(() => import('./AppTile'), {
	ssr: false,
	loading: () => <TitleAdminPlaceholder />,
});

interface IPageContentAdminProps extends IAppTitleProps {
	children?: React.ReactNode;
	fallback?: React.ReactNode;
	showTitle?: boolean;
	paddingX?: boolean;
}

const classContent = classNames(['bg-slate-300', 'transition']);

const PageContentAdmin: React.FC<IPageContentAdminProps> = props => {
	const { showTitle = true, paddingX = true } = props;
	return (
		<ModalState>
			<LayoutDashboard>
				<PrivateRoute fallback={props.fallback || <DashboardLoader />}>
					<div className={classContent + ' h-full'}>
						{showTitle ? (
							<AppTitle
								btnBackText={props.btnBackText}
								btnBackUrl={props.btnBackUrl}
								descripcion={props.descripcion}
								titulo={props.titulo}
								Icon={props.Icon}
								breadCrumb={props.breadCrumb}
							/>
						) : null}
						<main
							className={`py-3 ${
								paddingX ? `px-4 md:px-8` : ''
							}`}
						>
							{props.children}
						</main>
					</div>
				</PrivateRoute>
			</LayoutDashboard>
		</ModalState>
	);
};

export default PageContentAdmin;
