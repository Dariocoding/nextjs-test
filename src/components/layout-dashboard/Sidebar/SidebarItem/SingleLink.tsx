import { NextLink } from '@/components/@common/Link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { classActiveItemInner, classItem, classItemInner } from '.';
import { RouteSidebar } from '../routesSidebar';

interface ISingleLinkProps {
	Item: RouteSidebar;
	sizeIcon?: number;
	subnav?: string;
	setSubnav?(stateSubNav: string): void;
}

const SingleLink: React.FunctionComponent<ISingleLinkProps> = props => {
	const { Item } = props;
	const { pathname } = useRouter();
	const isActive = Item.path === pathname ? ' active' : '';

	if (typeof Item.path !== 'string') return null;

	return (
		<NextLink href={Item.path}>
			<div className={classItem}>
				<div className={isActive ? classActiveItemInner : classItemInner}>
					<Item.Icon className="mr-2" size={props.sizeIcon} />
					<span className="select-none font-medium">
						{Item.title}
					</span>
				</div>
			</div>
		</NextLink>
	);
};

export default SingleLink;
