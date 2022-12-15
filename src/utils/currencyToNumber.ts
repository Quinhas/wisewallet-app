export function currencyToNumber(value?: string): number {
	if (!value) {
		return 0;
	}
	const numberValue = Number(
		value
			.replace(/\./g, '')
			.replace(',', '.')
			.replace(/[^0-9.]/g, '')
	);

	return Number.isNaN(numberValue) ? 0 : numberValue;
}
