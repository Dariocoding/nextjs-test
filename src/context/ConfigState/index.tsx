import * as React from 'react';
import clienteAxios from '../../config/axios';
import { SettingsConfig, SettingsType } from '../../config/settings';

interface ConfigContextValues {
	configuracion?: SettingsType;
	obtenerConfiguracion?(): Promise<void>;
}

const ConfigContext = React.createContext<ConfigContextValues>({});

interface IConfigStateProps {
	children?: React.ReactNode;
}

const ConfigState: React.FC<IConfigStateProps> = props => {
	const [configuracion, setConfiguracion] = React.useState({});
	// Retorna el usuario autenticado
	const obtenerConfiguracion = async () => {
		try {
			const { data } = await clienteAxios.get(SettingsConfig.endpoints.get);
			setConfiguracion(data);
		} catch (error) {}
	};

	React.useEffect(() => {
		obtenerConfiguracion();
	}, []);

	return (
		<ConfigContext.Provider value={{ configuracion, obtenerConfiguracion }}>
			{props.children}
		</ConfigContext.Provider>
	);
};
export default ConfigState;

export const useConfigContext = () => React.useContext(ConfigContext);
