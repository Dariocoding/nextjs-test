import { NextLink } from '@/components/@common/Link';
import { FaHome } from '@/components/Icons/fa/FaHome';
import classNames from 'classnames';
import * as React from 'react';

type BreadcrumbType = Array<{ link?: string; titulo: string }>;
export interface IBreadCrumbProps {
	breadCrumb?: BreadcrumbType;
}

const BreadCrumbItem = classNames([
	'before:text-gray-400',
	'before:content-["/"]',
	'before:float-left',
	'before:px-1',
]);
const BreadCrumb: React.FC<IBreadCrumbProps> = ({ breadCrumb }) => {
	if (!breadCrumb) return null;
	return (
		<ul className="mb-0 text-left uppercasse bg-transparent flex rounded-sm flex-wrap list-none p-3 text-xs">
			<li className="flex items-center mr-2">
				<NextLink href={'/dashboard'} className={'text-black'}>
					<FaHome />
				</NextLink>
			</li>
			{breadCrumb.map(({ link, titulo }) => (
				<li key={titulo} className={BreadCrumbItem}>
					{link ? (
						<NextLink href={link} className={'text-black'}>
							{titulo}
						</NextLink>
					) : (
						titulo
					)}
				</li>
			))}
		</ul>
	);
};

export default BreadCrumb;
