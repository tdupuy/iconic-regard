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

export function parseLocalDate(dateStr: string): Date {
	const [year, month, day] = dateStr.split('-').map(Number);
	return new Date(year, month - 1, day);
}

export function getWeekStart(dateParam: string | null): Date {
	const base = dateParam ? parseLocalDate(dateParam) : new Date();
	const day = base.getDay();
	const diffToMonday = day === 0 ? -6 : 1 - day;
	const monday = new Date(base);
	monday.setDate(base.getDate() + diffToMonday);
	monday.setHours(0, 0, 0, 0);
	return monday;
}

export function isSameDay(a: Date, b: Date): boolean {
	return a.toDateString() === b.toDateString();
}

type CalendarEvent = {
	start: { dateTime?: string };
	end: { dateTime?: string };
};

export function eventStart(event: CalendarEvent): Date | null {
	return event.start.dateTime ? new Date(event.start.dateTime) : null;
}

export function eventEnd(event: CalendarEvent): Date | null {
	return event.end.dateTime ? new Date(event.end.dateTime) : null;
}

export function formatTimeRange(event: CalendarEvent): string {
	const start = eventStart(event);
	const end = eventEnd(event);
	if (!start) return '';
	const startStr = start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
	if (!end) return startStr;
	const endStr = end.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
	return `${startStr} - ${endStr}`;
}

export function toDateParam(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
}
