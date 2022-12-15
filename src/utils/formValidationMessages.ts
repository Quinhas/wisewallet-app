export const requiredFieldMessage = 'This field is required.';
export const invalidEmailMessage = 'Invalid email.';
export const invalidDateMessage = 'Invalid date.';
export const invalidAgeMessage = 'You must be at least 15 years old.';
export const passwordsMatchMessage = "Passwords don't match.";
export const termsAndConditionsMessage =
	'You must agree to the Terms and Conditions of use.';
export const maxLengthMessage = (field: string, max: number): string =>
	`The ${field} must have ${max} characters or fewer.`;
export const minLengthMessage = (field: string, min: number): string =>
	`The ${field} must have at least ${min} characters.`;
export const sameAccountTransferMessage =
	'The source account and the destination account cannot be the same.';
export const insufficientBalanceMessage = 'Insufficient balance.';
export const insufficientLimitMessage = 'Insufficient limit.';
export const valueGreaterThanMessage = (value: string): string =>
	`The value must be greater than ${value}.`;
export const invalidValueMessage = 'Invalid value.';
