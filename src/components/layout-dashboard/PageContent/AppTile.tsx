import { Button, NextLink } from '../../@common';
import { FaArrowLeft } from 'react-icons/fa';
import { IconType } from 'react-icons';
import * as React from 'react';
import { useTheme } from '../../../context/DarkModeState';
import classNames from 'classnames';
import BreadCrumb, { IBreadCrumbProps } from './BreadCrumb';

export interface IAppTitleProps extends IBreadCrumbProps {
	btnBackUrl?: string;
	btnBackText?: string;
	descripcion?: React.ReactNode;
	titulo?: string;
	Icon?: IconType;
}

const classTitle = classNames([
	'flex',
	'items-center',
	'bg-slate-100',
	'dark:bg-slate-800',
	'py-3',
	'px-5',
	'mt-5',
	'md:mt-0',
	'justify-between',
	'flex-row',
	'mb-4',
	'shadow-lg',
	'flex-col',
	'lg:flex-row',
]);

const AppTitle: React.FC<IAppTitleProps> = props => {
	const { theme } = useTheme();
	const { btnBackUrl, btnBackText, titulo, descripcion, Icon } = props;
	return (
		<div className={classTitle}>
			<div>
				<h1 className="flex items-center text-xl font-semibold mb-2 px-2">
					{btnBackUrl && (
						<NextLink href={btnBackUrl}>
							<Button
								variant="primary"
								className="hover:animate-bounce-left mr-2"
							>
								<FaArrowLeft
									size={10}
									className={'mr-1'}
								/>{' '}
								{btnBackText}
							</Button>
						</NextLink>
					)}
					<Icon
						className="mx-2"
						color={theme === 'light' ? '#111' : '#fff'}
						style={{ verticalAlign: 'middle' }}
					/>
					{titulo}
				</h1>
				{descripcion && (
					<p className="mt-1 text-sm text-center lg:text-left">
						{descripcion}
					</p>
				)}
			</div>
			<BreadCrumb breadCrumb={props.breadCrumb} />
		</div>
	);
};

export default AppTitle;
