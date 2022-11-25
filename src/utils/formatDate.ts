import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(value: Date): string {
	return format(parseISO(String(value)), 'P', {
		locale: ptBR
	});
}
