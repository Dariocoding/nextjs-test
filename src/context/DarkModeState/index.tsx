import * as React from 'react';

interface IDarkModeStateProps {
	children: React.ReactNode;
}

export type DarkMode = 'dark' | 'light';

interface DarkModeValues {
	theme?: DarkMode;
	toggleTheme?(): void;
}

const DarkModeContext = React.createContext<DarkModeValues>({});

const DarkModeState: React.FunctionComponent<IDarkModeStateProps> = props => {
	const [theme, setTheme] = React.useState<DarkMode>();

	React.useEffect(() => {
		const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const userTheme = localStorage.getItem('theme');
		if (!userTheme) {
			setTheme(systemTheme ? 'dark' : 'light');
			if (systemTheme) document.documentElement.classList.add('dark');
		} else {
			if (userTheme === 'light') return setTheme('light');
			setTheme('dark');
			document.documentElement.classList.add('dark');
		}
	}, []);

	function toggleTheme() {
		if (theme === 'dark') {
			setTheme('light');
			localStorage.setItem('theme', 'light');
			if (document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.remove('dark');
			}
		} else {
			setTheme('dark');
			localStorage.setItem('theme', 'dark');
			if (!document.documentElement.classList.contains('dark')) {
				document.documentElement.classList.add('dark');
			}
		}
	}

	return (
		<DarkModeContext.Provider value={{ theme, toggleTheme }}>
			{props.children}
		</DarkModeContext.Provider>
	);
};

export default DarkModeState;

export const useTheme = () => React.useContext(DarkModeContext);
