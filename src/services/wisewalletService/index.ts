import { authService } from './authService';

interface ErrorProps {
	message: string;
}

export interface ErrorResponse {
	message: string;
	errors?: ErrorProps[];
}
export const wisewallet = {
	...authService
};
