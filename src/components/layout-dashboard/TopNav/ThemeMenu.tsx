import { CheckboxToggle } from 'react-rainbow-components';
import * as React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../context/DarkModeState';

const CustomCheckBoxToggle = styled(CheckboxToggle)`
	.rainbow-checkbox-toggle_faux {
		background-color: #94a3b8;
	}
`;

const ThemeMenu: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	return <CustomCheckBoxToggle value={theme === 'dark'} id={'qlq'} onClick={toggleTheme} />;
};

export default ThemeMenu;
