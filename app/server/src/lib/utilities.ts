import { createHash } from 'crypto';

export function hashString(input: string): string {
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}
