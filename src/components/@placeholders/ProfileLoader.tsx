import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

const ProfileLoader: React.FC<IContentLoaderProps> = props => (
	<div className="py-3 px-8 flex justify-center">
		<ContentLoader
			viewBox="0 0 400 150"
			backgroundColor={'#eaeced'}
			foregroundColor={'#ffffff'}
			className={'animate-pulse'}
			{...props}
		>
			<circle cx="31" cy="31" r="15" />
			<rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
			<rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
			<rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
		</ContentLoader>
	</div>
);
export default ProfileLoader;
