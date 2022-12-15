import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(value: Date | string): string {
	const str = value instanceof Date ? String(value) : value;
	return format(parseISO(str), 'P', {
		locale: ptBR
	});
}
