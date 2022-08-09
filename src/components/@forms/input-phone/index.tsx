import { FormikValues, getIn, useFormikContext } from 'formik';
import * as React from 'react';
import PhoneInputRainbow from 'react-rainbow-components/components/PhoneInput';
import Label from '../Label';
import { PhoneInputValue } from 'react-rainbow-components/components/PhoneInput';

interface IPhoneInputFormikProps {
	label: string;
	nameInput: string;
	nameSelect: string;
	nameIsoCode: string;
	placeholder?: string;
	required?: boolean;
}

export const PhoneInputFormik: React.FC<IPhoneInputFormikProps> = props => {
	const { values, errors, touched, setFieldValue, setFieldTouched } =
		useFormikContext<FormikValues>();
	const { label, required, nameInput, nameIsoCode, nameSelect, placeholder } = props;

	const countryCode = getIn(values, nameSelect);
	const isoCode = getIn(values, nameIsoCode);
	const phone = getIn(values, nameInput);

	const validateError = getIn(errors, nameInput) && getIn(touched, nameInput);
	const labelPhone = label + (required ? ' (Obligatorio)' : '');

	function onChangePoneInput(value: PhoneInputValue) {
		setFieldValue(nameInput, value.phone);
		setFieldValue(nameSelect, value.countryCode);
		setFieldValue(nameIsoCode, value.isoCode);
	}

	const value = { countryCode, isoCode, phone };
	return (
		<div className="mb-3">
			<Label label={labelPhone} />
			<PhoneInputRainbow
				value={value}
				placeholder={placeholder}
				onChange={onChangePoneInput}
				onClick={() => setFieldTouched(nameInput, true)}
			/>
			{validateError && (
				<small className="required">{getIn(errors, nameInput)}</small>
			)}
		</div>
	);
};
