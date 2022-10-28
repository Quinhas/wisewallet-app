import axios, { AxiosInstance } from 'axios';

export const httpClient: AxiosInstance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production' ? 'teste' : 'http://localhost:3033'
});
