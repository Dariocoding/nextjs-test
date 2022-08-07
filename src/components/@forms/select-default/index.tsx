import { FormikValues, getIn, useFormikContext, Field } from 'formik';
import * as React from 'react';
import Label from '../Label';

interface ISelectDefaultFormikProps {
	label?: string;
	name: string;
	required?: boolean;
	children?: React.ReactNode | React.ReactNode[];
	onChange?(e: React.ChangeEvent<HTMLInputElement>, handleChange: any): void;
}

export const SelectDefaultFormik: React.FunctionComponent<ISelectDefaultFormikProps> = props => {
	const { errors, touched, handleChange } = useFormikContext<FormikValues>();
	const { label, required, name, onChange } = props;
	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);
	const validateError = error && isTouched;

	return (
		<div className={'mb-3'}>
			{props.label ? (
				<Label
					label={label}
					required={required}
					name={name}
					validateError={validateError}
				/>
			) : null}
			<Field
				as={'select'}
				className={'form-input'}
				name={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (onChange) {
						return onChange(e, handleChange);
					}
					handleChange(e);
				}}
			>
				{props.children}
			</Field>

			{validateError ? <small className="required text-xs">{error}</small> : null}
		</div>
	);
};
