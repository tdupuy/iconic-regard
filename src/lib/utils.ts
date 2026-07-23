export function isPlaceholderEmail(email: string | null | undefined): boolean {
	return !email || email.endsWith('sms.cal.com');
}

export function formatDateTime(value: string | Date): string {
	const d = new Date(value);
	return d.toLocaleString('fr-FR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
