export function getAccessToken(): string {
	const token = localStorage.getItem('wisewallet@accessToken');
	return token ?? '';
}
