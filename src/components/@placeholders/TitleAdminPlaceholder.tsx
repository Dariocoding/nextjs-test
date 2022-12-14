import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const TitleAdminPlaceholder: React.FC<IContentLoaderProps> = props => (
	<ContentLoader
		className="mt-2 animate-pulse"
		speed={1}
		viewBox="0 0 340 84"
		backgroundColor={'#eaeced'}
		foregroundColor={'#ffffff'}
		{...props}
	>
		<rect x="9" y="4" rx="0" ry="0" width="320" height="22" />
		<rect x="18" y="14" rx="0" ry="0" width="303" height="6" />
		<rect x="11" y="33" rx="0" ry="0" width="108" height="13" />
		<rect x="129" y="33" rx="0" ry="0" width="60" height="13" />
		<rect x="196" y="33" rx="0" ry="0" width="60" height="13" />
	</ContentLoader>
);

export default TitleAdminPlaceholder;
