import { google } from 'googleapis';
import type { JWT } from 'googleapis-common';
import path from 'path';
import { getOrCreateServer } from '../server';

const server = getOrCreateServer();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const _oAuthClient = new google.auth.OAuth2({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_REDIRECT_URI,
});

export function getOrCreateGoogleOAuthClient(redirectUri: string | undefined = undefined) {
    if (!redirectUri) return _oAuthClient;
    return new google.auth.OAuth2({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri,
    });
}

export function createAndGetGoogleOAuthClient(redirectUri: string | undefined = undefined) {
    return new google.auth.OAuth2({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        redirectUri: redirectUri || GOOGLE_REDIRECT_URI,
    });
}

// JWT client singleton
let _googleJWTClient: JWT | null = null;

export function getOrCreateGoogleJWTClient({ scopes }: { scopes?: string[] }) {
    if (_googleJWTClient) return _googleJWTClient;

    if (process.env.NODE_ENV === 'production') {
        server.log.info('Creating Google JWT client from GOOGLE_APPLICATION_CREDENTIALS');
        _googleJWTClient = new google.auth.JWT({
            keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
            scopes: scopes,
            subject: 'admin@prytaneum.io',
        });
        return _googleJWTClient;
    }

    server.log.info('Creating Google JWT client from credentials.json');
    const oAuthCredentialsPath = path.resolve(__dirname, 'credentials.json');
    _googleJWTClient = new google.auth.JWT({
        keyFile: oAuthCredentialsPath,
        scopes: scopes,
        subject: 'admin@prytaneum.io',
    });
    return _googleJWTClient;
}
