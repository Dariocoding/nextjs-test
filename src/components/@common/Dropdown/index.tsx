import * as React from 'react';
import { useEffect } from 'react';
import { IconType } from 'react-icons';
import {
	classDropdown,
	DropdownBadge,
	DropdownContent,
	DropdownFooter,
	DropdowToggle,
} from './styles';

interface IDropdownProps {
	Icon?: IconType;
	badge?: string;
	CustomToggle?: React.FC;
	RenderFooter?: React.FC;
	ContentData: React.FC;
}

export const Dropdown: React.FunctionComponent<IDropdownProps> = props => {
	const { badge, CustomToggle, RenderFooter, Icon, ContentData } = props;
	const [open, setOpen] = React.useState(false);
	const dropdown_toggle_el = React.useRef<HTMLButtonElement>(null);
	const dropdown_content_el = React.useRef<HTMLDivElement>(null);
	const toggleDropdown = () => setOpen(!open);

	function handleCloseDropdow(e: MouseEvent) {
		//@ts-ignore
		if (!dropdown_toggle_el.current.contains(e.target)) {
			toggleDropdown();
		}
	}

	useEffect(() => {
		if (open) document.addEventListener('click', handleCloseDropdow);

		return () => {
			document.removeEventListener('click', handleCloseDropdow);
		};
	});

	return (
		<div className={classDropdown}>
			<button
				ref={dropdown_toggle_el}
				className={DropdowToggle}
				onClick={toggleDropdown}
			>
				{Icon ? <Icon size={16} /> : null}
				{badge ? <small className={DropdownBadge}>{badge}</small> : null}
				{CustomToggle ? <CustomToggle /> : null}
			</button>

			<div
				ref={dropdown_content_el}
				className={DropdownContent}
				style={{ transform: `scale(${open ? 1 : 0})`, overflow: 'auto' }}
			>
				<ContentData />
				{RenderFooter ? (
					<div className={DropdownFooter}>
						<RenderFooter />
					</div>
				) : null}
			</div>
		</div>
	);
};
