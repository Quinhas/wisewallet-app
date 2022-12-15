import { format } from 'date-fns';

/**
 *
 * @param value Date in format dd/mm/yyyy
 * @returns Date in format yyyy-mm-dd HH:mm:ss
 */
export function formatDateDB(value: Date): Date {
	const date = value.toISOString().split('T')[0];
	const time = format(new Date(), 'HH:mm:ss');
	const dateString = `${date} ${time}`;
	return new Date(dateString);
}
