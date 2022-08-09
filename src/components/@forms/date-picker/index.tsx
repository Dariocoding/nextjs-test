import DatePickerRainbow from 'react-rainbow-components/components/DatePicker';
import { FormikValues, useFormikContext, getIn } from 'formik';
interface IDatePickerFormikProps {
	label: string;
	name: string;
	required?: boolean;
}

export const DatePickerFormik: React.FunctionComponent<IDatePickerFormikProps> = props => {
	const { name, label, required } = props;
	const { values, errors, setFieldValue, setFieldTouched, touched } =
		useFormikContext<FormikValues>();
	const value = getIn(values, name);
	const validateError = touched[name] && errors[name];

	const labelDatePicker = label + (required ? ' (Obligatorio)' : '');

	return (
		<div className="mb-3">
			<DatePickerRainbow
				formatStyle="small"
				value={value}
				label={labelDatePicker}
				onChange={value => setFieldValue(name, value)}
				onClick={() => setFieldTouched(name, true)}
			/>
			{validateError && (
				<small className="required">{errors[name].toString()}</small>
			)}
		</div>
	);
};
