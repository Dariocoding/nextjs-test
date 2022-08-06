import { CheckboxToggle as CheckboxToggleRainbow } from 'react-rainbow-components';

import * as React from 'react';
import { FormikValues, getIn, useFormikContext } from 'formik';

interface ICheckboxToggleFormikProps {
	label?: string;
	name?: string;
}

export const CheckboxToggleFormik: React.FC<ICheckboxToggleFormikProps> = props => {
	const { label, name } = props;
	const { values, setFieldValue } = useFormikContext<FormikValues>();
	const value = getIn(values, name);

	const handleChange = () => setFieldValue(name, !value);

	return (
		<div className="mb-3">
			<CheckboxToggleRainbow
				label={label}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};
