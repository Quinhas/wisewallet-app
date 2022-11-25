export default class WisewalletApplicationException extends Error {
	message: string;

	constructor(message: string) {
		super();
		this.message = message;
	}
}
