export const SettingsConfig = { endpoints: { get: '/settings', update: '/settings' } };

export interface SettingsType {
	_id?: string;
	nombre?: string;

	correo?: string;

	telefono?: string;

	direccion?: string;

	web?: string;

	precio_envio?: number;

	orden_actual_idiomas?: number[];
}
