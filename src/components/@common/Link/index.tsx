import Link from 'next/link';
import * as React from 'react';

interface INextLinkProps {
	href: string;
	children?: React.ReactNode;
	className?: string;
}

export const NextLink: React.FC<INextLinkProps> = props => (
	<Link href={props.href}>
		<a className={(props.className ? props.className : '') + ' hover:no-underline'}>
			{props.children}
		</a>
	</Link>
);
