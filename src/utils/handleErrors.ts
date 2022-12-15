/* eslint-disable no-console */
import WisewalletApplicationException from 'errors/WisewalletApplicationException';

export function handleKnownError(error: WisewalletApplicationException): null {
	console.log(error);
	return null;
}

export function handleUnknownError(error: unknown): null {
	console.log(error);
	return null;
}
