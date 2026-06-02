import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';

const ADMIN_USERNAME = env.ADMIN_USERNAME;
const ADMIN_PASSWORD = env.ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
	throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be defined in environment variables');
}

export interface AuthSession {
	authenticated: boolean;
	username?: string;
}

export function validateCredentials(username: string, password: string): boolean {
	return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSessionCookie(value: string) {
	return {
		name: 'auth_session',
		value,
		options: {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev, // HTTPS en prod seulement
			maxAge: 60 * 60 * 24 * 7 // 7 jours
		}
	};
}

export function generateSessionToken(): string {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
