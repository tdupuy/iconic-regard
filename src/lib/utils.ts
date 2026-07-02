export function isPlaceholderEmail(email: string | null | undefined): boolean {
	return !email || email.endsWith('sms.cal.com');
}
