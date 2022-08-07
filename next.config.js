/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig = /* withBundleAnalyzer */ {
	compiler: { styledComponents: true, emotion: true, removeConsole: true },
	reactStrictMode: true,
	images: {
		domains: ['api.aelee.com.ve', 'localhost'],
	},

	publicRuntimeConfig: {
		NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
		NEXT_PUBLIC_PUBLIC_URL: process.env.NEXT_PUBLIC_PUBLIC_URL,
		NEXT_PUBLIC_URLPAYPAL: process.env.NEXT_PUBLIC_URLPAYPAL,
		NEXT_PUBLIC_CLIENTE_ID_PAYPAL: process.env.NEXT_PUBLIC_CLIENTE_ID_PAYPAL,
	},
};

module.exports = nextConfig;
