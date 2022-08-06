import { FormikTouched } from 'formik';
import React from 'react';

export interface ILabelProps {
	name?: string;
	label?: React.ReactNode;
	labelEnd?: React.ReactNode;
	required?: boolean;
	validateError?: boolean | FormikTouched<any> | FormikTouched<any>[];
}

const Label: React.FunctionComponent<ILabelProps> = props => {
	const { name, label, required, validateError } = props;
	if (!label) return null;
	return (
		<div className="flex justify-between">
			<label htmlFor={name} className="label-input">
				{validateError ? <span className="required">{label}</span> : label}{' '}
				{required && <span className={'required'}>(*)</span>}
			</label>
			{props.labelEnd}
		</div>
	);
};

export default Label;
