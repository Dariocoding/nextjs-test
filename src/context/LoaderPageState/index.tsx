import * as React from 'react';
import Loader from './Loader';

interface ILoaderPageStateProps {
	children: React.ReactNode;
}

interface LoaderPageValues {
	setLoader?(loading: boolean, text?: string): void;
}

const LoaderPageContext = React.createContext<LoaderPageValues>({});

const LoaderPageState: React.FunctionComponent<ILoaderPageStateProps> = props => {
	const [loading, setLoading] = React.useState(false);
	const [text, setText] = React.useState('loading');

	const setLoader = (loading: boolean, text = 'loading') => {
		setLoading(loading);
		setText(text);
	};

	return (
		<LoaderPageContext.Provider value={{ setLoader }}>
			<Loader texto={text} loading={loading} />
			{props.children}
		</LoaderPageContext.Provider>
	);
};

export const useLoader = () => React.useContext(LoaderPageContext);

export default LoaderPageState;
