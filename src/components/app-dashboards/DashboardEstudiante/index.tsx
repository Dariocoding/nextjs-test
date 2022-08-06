import * as React from 'react';
import NextHead from '../../@common/next-head';

interface IDashboardEstudianteProps {}

const DashboardEstudiante: React.FunctionComponent<IDashboardEstudianteProps> = props => {
	return (
		<React.Fragment>
			<NextHead
				title={'Dashboard Estudiante'}
				description={'Dashboard Estudiante'}
			/>
		</React.Fragment>
	);
};

export default DashboardEstudiante;
