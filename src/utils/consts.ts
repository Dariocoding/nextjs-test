import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const SMONEY = '$';
export const RADMIN = 1;
export const RUSUARIO = 2;
export const IDSUPERADMINISTRADOR = 1;
export const IDPAGOPAYPAL = 1;

export const PF = publicRuntimeConfig.NEXT_PUBLIC_PUBLIC_URL;
export const BACKEND_URL = publicRuntimeConfig.NEXT_PUBLIC_BACKEND_URL;
export const fechaActual = new Date(new Date().setHours(0, 0, 0, 0));
export const URLDOLARTODAY = 'https://s3.amazonaws.com/dolartoday/data.json';
export const URLPAYPAL = publicRuntimeConfig.NEXT_PUBLIC_URLPAYPAL;
export const CLIENTEIDPAYPAL = publicRuntimeConfig.NEXT_PUBLIC_CLIENTE_ID_PAYPAL;
export const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 2,
});
