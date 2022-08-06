import * as React from 'react';
import clienteAxios from '../config/axios';

interface State<T> {
	data?: T;
	error?: Error;
	loading: boolean;
}

type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
	| { type: 'loading' }
	| { type: 'fetched'; payload: T }
	| { type: 'error'; payload: Error }
	| { type: 'set-data'; payload: T };

function useFetch<T = unknown>(
	url: string,
	initialValueDataState: any
): State<T> & { setData(data: T): void } {
	const cache = React.useRef<Cache<T>>({});

	// Used to prevent state update if the component is unmounted
	const cancelRequest = React.useRef<boolean>(false);

	const initialState: State<T> = {
		error: undefined,
		data: initialValueDataState,
		loading: true,
	};

	// Keep state logic separated
	const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case 'loading':
				return { ...initialState };
			case 'fetched':
				return { ...initialState, data: action.payload, loading: false };

			case 'error':
				return { ...initialState, error: action.payload, loading: false };
			case 'set-data':
				return { ...initialState, data: action.payload };
			default:
				return state;
		}
	};

	const setData = (data: T) => {
		dispatch({ type: 'set-data', payload: data });
	};

	const [state, dispatch] = React.useReducer(fetchReducer, initialState);

	React.useEffect(() => {
		// Do nothing if the url is not given
		if (!url) return;

		cancelRequest.current = false;

		const fetchData = async () => {
			dispatch({ type: 'loading' });

			// If a cache exists for this url, return it
			if (cache.current[url]) {
				dispatch({ type: 'fetched', payload: cache.current[url] });
				return;
			}

			try {
				const response = await clienteAxios(url);
				const data = response.data as T;

				dispatch({ type: 'fetched', payload: data });
			} catch (error) {
				if (cancelRequest.current) return;

				dispatch({ type: 'error', payload: error as Error });
			}
		};

		void fetchData();

		// Use the cleanup function for avoiding a possibly...
		// ...state update after the component was unmounted
		return () => {
			cancelRequest.current = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { ...state, setData };
}

export default useFetch;
