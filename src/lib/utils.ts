export function isPlaceholderEmail(email: string | undefined): boolean {
	return !email || email.endsWith('sms.cal.com');
}
