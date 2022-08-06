import * as React from 'react';
import { Application } from 'react-rainbow-components';
import { ThemeType } from 'react-rainbow-components/components/Application';
import { useTheme } from '.';

interface IRainbowStateColorProps {
	children: React.ReactNode;
}

const RainbowStateColor: React.FC<IRainbowStateColorProps> = props => {
	const [loaded, setLoaded] = React.useState(false);
	const { theme } = useTheme();

	interface Themes {
		dark: ThemeType;
		light: ThemeType;
	}

	const themes: Themes = {
		dark: { rainbow: { palette: { mainBackground: '#1e293b', brand: '#fff' } } },
		light: {},
	};

	React.useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) return <React.Fragment>{props.children}</React.Fragment>;
	return <Application theme={themes[theme]}>{props.children}</Application>;
};

export default RainbowStateColor;
