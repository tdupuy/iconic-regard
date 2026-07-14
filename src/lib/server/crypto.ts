import { ENCRYPTION_KEY } from '$env/static/private';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const KEY = Buffer.from(ENCRYPTION_KEY, 'hex');
const ALGORITHM = 'aes-256-gcm';

export function encrypt(text: string): string {
	const iv = randomBytes(12);
	const cipher = createCipheriv(ALGORITHM, KEY, iv);
	const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
	const authTag = cipher.getAuthTag();
	// on stocke iv:authTag:données en base64 dans un seul champ
	return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(stored: string): string {
	const [ivHex, authTagHex, encryptedHex] = stored.split(':');
	const iv = Buffer.from(ivHex, 'hex');
	const authTag = Buffer.from(authTagHex, 'hex');
	const encrypted = Buffer.from(encryptedHex, 'hex');
	const decipher = createDecipheriv(ALGORITHM, KEY, iv);
	decipher.setAuthTag(authTag);
	return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}
