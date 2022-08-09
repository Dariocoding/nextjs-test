import { IconType } from '@/components/Icons/libs';
import * as React from 'react';

interface ITestimonialProps {
	Icon: IconType;
}

const Testimonial: React.FunctionComponent<ITestimonialProps> = props => (
	<div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
		<props.Icon className="h-10" />
	</div>
);

export default Testimonial;
