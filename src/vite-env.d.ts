/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_WISEWALLET_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
