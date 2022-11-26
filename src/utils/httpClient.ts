import axios, { AxiosInstance } from 'axios';

const apiLocal = false;
const prodUrl = apiLocal ? 'http://localhost:3033' : 'https://wisewallet-api-develop.up.railway.app/'

export const httpClient: AxiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://wisewallet-api-production.up.railway.app/'
			: prodUrl
});
