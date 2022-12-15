import axios, { AxiosInstance } from 'axios';
import WisewalletApplicationException from 'errors/WisewalletApplicationException';

const baseUrl = import.meta.env.VITE_WISEWALLET_API_URL as unknown as
	| string
	| undefined;

if (!baseUrl) {
	throw new WisewalletApplicationException('API_URL is not defined.');
}

export const httpClient: AxiosInstance = axios.create({
	baseURL: baseUrl
});
