import { useFormikContext, Field, getIn } from 'formik';
import * as React from 'react';
import Label from '../Label';

interface IInputProps {
	label?: React.ReactNode;
	labelEnd?: React.ReactNode;
	name: string;
	disabled?: boolean;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	autoFocus?: boolean;
	onChange?(value: string | number): string | number;
	required?: boolean;
}

export const InputFormik: React.FunctionComponent<IInputProps> = props => {
	const { errors, touched } = useFormikContext();
	const { type = 'text', name, autoFocus, onChange } = props;

	const error = getIn(errors, name);
	const isTouched = getIn(touched, name);
	const validateError = error && isTouched;

	return (
		<div className="mb-3">
			{props.label ? (
				<Label
					name={props.name}
					required={props.required}
					validateError={validateError}
					label={props.label}
					labelEnd={props.labelEnd}
				/>
			) : null}

			<Field
				id={name}
				type={type}
				disabled={props.disabled}
				name={name}
				autoFocus={autoFocus}
				className={'form-input'}
				placeholder={props.placeholder}
			/>

			{validateError ? <small className="required text-xs">{error}</small> : null}
		</div>
	);
};
