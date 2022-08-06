import * as React from 'react';
import { IconType } from 'react-icons';

interface ITestimonialProps {
	Icon: IconType;
}

const Testimonial: React.FunctionComponent<ITestimonialProps> = props => (
	<div className="flex items-center justify-center py-2 col-span-2 md:col-auto">
		<props.Icon size={35} />
	</div>
);

export default Testimonial;
