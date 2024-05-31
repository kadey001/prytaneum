// Supported languages, Code is the language code, text is the language name, and country is the country code (used for flag)
export const SUPPORTED_LANGUAGES = [
    { code: 'EN', text: 'English', country: 'us' },
    { code: 'ES', text: 'Spanish', country: 'es' },
] as const;

// TLanguages is a type that represents the supported languages
export type TLanguages = 'EN' | 'ES';
