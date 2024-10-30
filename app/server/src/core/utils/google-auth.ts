import { google } from 'googleapis';
import { getOrCreateServer } from '../server';
import { getPrismaClient } from './prisma';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const server = getOrCreateServer();

const client = new google.auth.OAuth2({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: GOOGLE_REDIRECT_URI,
});

export function getOrCreateGoogleOAuthClient(redirectUri: string | undefined = undefined) {
    if (!redirectUri) return client;
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

export async function validateRefreshToken(refreshToken: string) {
    const oAuthClient = createAndGetGoogleOAuthClient();
    oAuthClient.setCredentials({ refresh_token: refreshToken });
    try {
        const { token } = await oAuthClient.getAccessToken();
        console.log('Access token obtained:', token);
        // The refresh token is valid
        return true;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        // The refresh token is invalid or expired
        return false;
    }
}

// Get the access token from the refresh token or throw an error
export async function getAccessToken(refreshToken: string) {
    const oAuthClient = createAndGetGoogleOAuthClient();
    oAuthClient.setCredentials({ refresh_token: refreshToken });
    const { token, res } = await oAuthClient.getAccessToken();
    if (res?.status !== 200 || !token) {
        throw new Error('getAccessToken: Error getting access token, please re-authenticate');
    }
    return token;
}

export async function getAccessTokenByUserId(userId: string) {
    const prisma = getPrismaClient(server.log);
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { oAuthRefreshToken: true },
    });
    if (!user || !user.oAuthRefreshToken) {
        throw new Error('getAccessTokenByUserId: User not found or not authenticated');
    }
    return getAccessToken(user.oAuthRefreshToken);
}
