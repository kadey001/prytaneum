import mg from './client';

export type EmailTemplates = 'prytaneum-invite' | 'password-reset' | 'prytaneum-invites' | 'register-attempt';

export interface EmailConfig {
    to: string | Array<string>;
    subject: string;
    text?: string;
    'o:deliverytime'?: string;
    'recipient-variables'?: string;
    template?: EmailTemplates;
    'h:X-Mailgun-Variables'?: string;
    'v:invite-url'?: string;
    'v:first-name'?: string;
    'v:unsubscribe-url'?: string;
}

/**
 * @description internal function to use mg api to send email
 * @param {EmailConfig} mailgun email configuration
 * @returns {Promise<string>}
 */
export async function sendEmail(config: EmailConfig) {
    // TODO: Generate unsubscribe url and attach to all emails
    if (!process.env.MAILGUN_DOMAIN) throw new Error('MAILGUN_DOMAIN not configured');

    if (process.env.NODE_ENV === 'test') {
        return new Promise<string>((resolve) => resolve('success'));
    }
    if (process.env.NODE_ENV === 'development') {
        return mg.messages.create(process.env.MAILGUN_DOMAIN, {
            ...config,
            from: `Prytaneum <${process.env.MAILGUN_FROM_EMAIL}>`,
            'o:testmode': 'true',
        });
    }
    return mg.messages.create(process.env.MAILGUN_DOMAIN, {
        ...config,
        from: `Prytaneum <${process.env.MAILGUN_FROM_EMAIL}>`,
    });
}
