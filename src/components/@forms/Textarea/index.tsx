import { Field, FieldAttributes, FormikValues, useFormikContext } from 'formik';
import * as React from 'react';
import Label from '../Label';

interface ITextAreaProps {
	label?: string;
	required?: boolean;
	name: string;
	cols?: number;
	rows?: number;
	placeholder?: string;
	max?: number;
}

const TextArea: React.FunctionComponent<ITextAreaProps> = props => {
	const { errors, touched } = useFormikContext<FormikValues>();
	const validateError = errors[props.name] && touched[props.name];

	function handleChange(
		e: React.ChangeEvent<HTMLTextAreaElement>,
		onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	) {
		if (props.max) {
			if (e.target.value.length > props.max) {
				return e.preventDefault();
			}
		}
		onChange(e);
	}

	return (
		<div className="mb-3">
			{props.label ? (
				<Label
					name={props.name}
					required={props.required}
					validateError={validateError}
					label={props.label}
				/>
			) : null}
			<Field name={props.name}>
				{({ field }: { field: FieldAttributes<any> }) => (
					<textarea
						className={'form-input'}
						cols={props.cols}
						id={props.name}
						rows={props.rows || 3}
						placeholder={props.placeholder}
						maxLength={props.max}
						value={field.value}
						onChange={e => handleChange(e, field.onChange)}
					/>
				)}
			</Field>
		</div>
	);
};

export default TextArea;
