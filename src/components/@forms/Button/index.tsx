import { FaSpinner2 } from '@/components/Icons/fa/FaSpinner2';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { OptionsColors } from '../../../extensions';
import { Button } from '../../@common/Buttons';

interface IButtonFormikProps {
	children?: React.ReactNode;
	variant?: OptionsColors;
	className?: string;
	large?: boolean;
}

export const ButtonFormik: React.FC<IButtonFormikProps> = props => {
	const { variant = 'primary' } = props;
	const { isSubmitting } = useFormikContext();

	return (
		<Button
			disabled={isSubmitting}
			variant={variant}
			type="submit"
			full
			large={props.large}
			className={props.className}
		>
			{!isSubmitting ? props.children : null}
			{isSubmitting ? <FaSpinner2 color="#fff" className="animate-spin" /> : null}
		</Button>
	);
};
