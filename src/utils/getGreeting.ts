import { getHours } from 'date-fns';

export default function getGreeting(): string {
	const hour = getHours(new Date());
	if (hour > 18) {
		return 'Good evening';
	}

	if (hour > 11) {
		return 'Good afternoon';
	}

	if (hour > 5) {
		return 'Good morning';
	}

	if (hour >= 0) {
		return 'Good morning';
	}

	return 'Hello';
}
