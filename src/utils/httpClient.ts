import axios, { AxiosInstance } from 'axios';

export const httpClient: AxiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://wisewallet-api-production.up.railway.app/'
			: 'http://localhost:3033'
});
