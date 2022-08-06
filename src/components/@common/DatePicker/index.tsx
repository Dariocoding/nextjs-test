import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const INPUT_SEARCH = styled(DatePicker)`
	border: 0;
	padding: 5px 10px;
	padding-right: 30px;
	border-radius: 5px;
	background-color: var(--primary-color);
	color: #fff;
	transition: background-color 0.3s ease;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	&:focus {
		border: none;
	}
`;

interface ISearchDatePickerProps {
	selected: Date;
	onChange(date: Date | [Date, Date]): void;
	dateFormat: string;
	showYearDropdown?: boolean;
	showYearPicker?: boolean;
	showMonthYearPicker?: boolean;
	showFullMonthYearPicker?: boolean;
	showFourColumnMonthYearPicker?: boolean;
	className?: string;
}

export const SearchDatePicker: React.FC<ISearchDatePickerProps> = props => (
	<div
		className={`flex items-center justify-center p-0 pb-3 ${
			props.className ? props.className : ''
		}`}
	>
		<div>
			<INPUT_SEARCH
				selected={props.selected}
				onChange={props.onChange}
				dateFormat={props.dateFormat}
				showYearDropdown={props.showYearDropdown}
				showYearPicker={props.showYearPicker}
				showMonthYearPicker={props.showMonthYearPicker}
				showFullMonthYearPicker={props.showFullMonthYearPicker}
				showFourColumnMonthYearPicker={props.showFourColumnMonthYearPicker}
				onKeyDown={e => e.preventDefault()}
			/>
		</div>
	</div>
);
