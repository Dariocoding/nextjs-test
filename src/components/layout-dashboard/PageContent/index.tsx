import * as React from 'react';
import AppTitle, { IAppTitleProps } from './AppTile';
import classNames from 'classnames';
import PrivateRoute from '../../routes/PrivateRoute';
import DashboardLoader from '../../@placeholders/DashboardPlaceholder';

interface IPageContentAdminProps extends IAppTitleProps {
	children?: React.ReactNode;
	fallback?: React.ReactNode;
}

const classContent = classNames(['bg-slate-300', 'dark:bg-slate-900', 'transition']);

const PageContentAdmin: React.FC<IPageContentAdminProps> = props => (
	<PrivateRoute fallback={props.fallback || <DashboardLoader />}>
		<div className={classContent + ' h-full'}>
			<AppTitle
				btnBackText={props.btnBackText}
				btnBackUrl={props.btnBackUrl}
				descripcion={props.descripcion}
				titulo={props.titulo}
				Icon={props.Icon}
				breadCrumb={props.breadCrumb}
			/>
			<main className="py-3 px-4 md:px-8">{props.children}</main>
		</div>
	</PrivateRoute>
);

export default PageContentAdmin;
