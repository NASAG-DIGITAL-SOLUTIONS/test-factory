/**
 * @typedef {object} CountryDetails
 * @property {string} countryNameEn
 * @property {string} countryNameLocal
 * @property {string} countryCode
 * @property {string} currencyCode
 * @property {string} currencyNameEn
 * @property {string} tinType
 * @property {string} tinName
 * @property {string} officialLanguageCode
 * @property {string} officialLanguageNameEn
 * @property {string} officialLanguageNameLocal
 * @property {string} countryCallingCode
 * @property {string[]} areaCodes
 * @property {string} region
 * @property {string} flag
 */

/**
 * @typedef {{[countryCode: string]: CountryDetails}} Countries
 */

/**
 * @type {Countries}
 */
export default {
    BH: {
        countryNameEn: 'Bahrain',
        countryNameLocal: 'البحرين',
        countryCode: 'BH',
        currencyCode: 'BHD',
        currencyNameEn: 'Bahraini dinar',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '973',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇧🇭'
    },
    DE: {
        countryNameEn: 'Germany',
        countryNameLocal: 'Deutschland',
        countryCode: 'DE',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: 'USt-IdNr.',
        tinName: 'Umsatzsteuer-Identifikationsnummer',
        officialLanguageCode: 'de',
        officialLanguageNameEn: 'German',
        officialLanguageNameLocal: 'Deutsch',
        countryCallingCode: '49',
        areaCodes: [],
        region: 'Europe',
        flag: '🇩🇪'
    },
    DK: {
        countryNameEn: 'Denmark',
        countryNameLocal: 'Danmark',
        countryCode: 'DK',
        currencyCode: 'DKK',
        currencyNameEn: 'Danish krone',
        tinType: 'CVR',
        tinName: 'Momsregistreringsnummer',
        officialLanguageCode: 'da',
        officialLanguageNameEn: 'Danish',
        officialLanguageNameLocal: 'dansk',
        countryCallingCode: '45',
        areaCodes: [],
        region: 'Europe',
        flag: '🇩🇰'
    },
    ES: {
        countryNameEn: 'Spain',
        countryNameLocal: 'España',
        countryCode: 'ES',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: 'NIF (CIF)',
        tinName:
            'Número de Identificación Fiscal (formerly named Código de Identificación Fiscal)',
        officialLanguageCode: 'es',
        officialLanguageNameEn: 'Spanish, Castilian',
        officialLanguageNameLocal: 'Español',
        countryCallingCode: '34',
        areaCodes: [],
        region: 'Europe',
        flag: '🇪🇸'
    },
    FR: {
        countryNameEn: 'France',
        countryNameLocal: 'France',
        countryCode: 'FR',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: 'n° TVA',
        tinName:
            "Numéro d'identification à la taxe sur la valeur ajoutée / Numéro de TVA intracommunautaire",
        officialLanguageCode: 'fr',
        officialLanguageNameEn: 'French',
        officialLanguageNameLocal: 'Français',
        countryCallingCode: '33',
        areaCodes: [],
        region: 'Europe',
        flag: '🇫🇷'
    },
    GR: {
        countryNameEn: 'Greece',
        countryNameLocal: 'Ελλάδα',
        countryCode: 'GR',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'el',
        officialLanguageNameEn: 'Greek, Modern (1453-)',
        officialLanguageNameLocal: 'ελληνικά',
        countryCallingCode: '30',
        areaCodes: [],
        region: 'Europe',
        flag: '🇬🇷'
    },
    IT: {
        countryNameEn: 'Italy',
        countryNameLocal: 'Italia',
        countryCode: 'IT',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: 'P.IVA',
        tinName: 'Partita IVA(IVA = Imposta sul Valore Aggiunto)',
        officialLanguageCode: 'it',
        officialLanguageNameEn: 'Italian',
        officialLanguageNameLocal: 'Italiano',
        countryCallingCode: '39',
        areaCodes: [],
        region: 'Europe',
        flag: '🇮🇹'
    },
    KW: {
        countryNameEn: 'Kuwait',
        countryNameLocal: 'الكويت',
        countryCode: 'KW',
        currencyCode: 'KWD',
        currencyNameEn: 'Kuwaiti dinar',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '965',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇰🇼'
    },
    OM: {
        countryNameEn: 'Oman',
        countryNameLocal: 'سلطنة عُمان',
        countryCode: 'OM',
        currencyCode: 'OMR',
        currencyNameEn: 'Omani rial',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '968',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇴🇲'
    },
    PL: {
        countryNameEn: 'Poland',
        countryNameLocal: 'Polska',
        countryCode: 'PL',
        currencyCode: 'PLN',
        currencyNameEn: 'Polish złoty',
        tinType: 'NIP',
        tinName: 'numer identyfikacji podatkowej',
        officialLanguageCode: 'pl',
        officialLanguageNameEn: 'Polish',
        officialLanguageNameLocal: 'język polski, polszczyzna',
        countryCallingCode: '48',
        areaCodes: [],
        region: 'Europe',
        flag: '🇵🇱'
    },
    PT: {
        countryNameEn: 'Portugal',
        countryNameLocal: 'Portugal',
        countryCode: 'PT',
        currencyCode: 'EUR',
        currencyNameEn: 'Euro',
        tinType: 'NIPC',
        tinName: 'Número de Identificação de Pessoa Coletiva (NIPC)',
        officialLanguageCode: 'pt',
        officialLanguageNameEn: 'Portuguese',
        officialLanguageNameLocal: 'Português',
        countryCallingCode: '351',
        areaCodes: [],
        region: 'Europe',
        flag: '🇵🇹'
    },
    QA: {
        countryNameEn: 'Qatar',
        countryNameLocal: 'قطر',
        countryCode: 'QA',
        currencyCode: 'QAR',
        currencyNameEn: 'Qatari riyal',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '974',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇶🇦'
    },
    RO: {
        countryNameEn: 'Romania',
        countryNameLocal: 'România',
        countryCode: 'RO',
        currencyCode: 'RON',
        currencyNameEn: 'Romanian leu',
        tinType: 'CIF',
        tinName: 'Codul de identificare fiscală',
        officialLanguageCode: 'ro',
        officialLanguageNameEn: 'Romanian, Moldavian, Moldovan',
        officialLanguageNameLocal: 'Română',
        countryCallingCode: '40',
        areaCodes: [],
        region: 'Europe',
        flag: '🇷🇴'
    },
    SA: {
        countryNameEn: 'Saudi Arabia',
        countryNameLocal: 'السعودية',
        countryCode: 'SA',
        currencyCode: 'SAR',
        currencyNameEn: 'Saudi riyal',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '966',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇸🇦'
    },
    SE: {
        countryNameEn: 'Sweden',
        countryNameLocal: 'Sverige',
        countryCode: 'SE',
        currencyCode: 'SEK',
        currencyNameEn: 'Swedish krona/kronor',
        tinType: 'Momsnr.',
        tinName: 'VAT-nummer',
        officialLanguageCode: 'sv',
        officialLanguageNameEn: 'Swedish',
        officialLanguageNameLocal: 'Svenska',
        countryCallingCode: '46',
        areaCodes: [],
        region: 'Europe',
        flag: '🇸🇪'
    },
    TR: {
        countryNameEn: 'Turkey',
        countryNameLocal: 'Türkiye',
        countryCode: 'TR',
        currencyCode: 'TRY',
        currencyNameEn: 'Turkish lira',
        tinType: 'KDV',
        tinName: 'Vergi Kimlik Numarası',
        officialLanguageCode: 'tr',
        officialLanguageNameEn: 'Turkish',
        officialLanguageNameLocal: 'Türkçe',
        countryCallingCode: '90',
        areaCodes: [],
        region: 'Europe',
        flag: '🇹🇷'
    },
    AE: {
        countryNameEn: 'United Arab Emirates',
        countryNameLocal: 'دولة الإمارات العربيّة المتّحدة',
        countryCode: 'AE',
        currencyCode: 'AED',
        currencyNameEn: 'United Arab Emirates dirham',
        tinType: '',
        tinName: '',
        officialLanguageCode: 'ar',
        officialLanguageNameEn: 'Arabic',
        officialLanguageNameLocal: 'العربية',
        countryCallingCode: '971',
        areaCodes: [],
        region: 'Arab States',
        flag: '🇦🇪'
    },
    CZ: {
        countryNameEn: 'Czechia',
        countryNameLocal: 'Česká republika',
        countryCode: 'CZ',
        currencyCode: 'CZK',
        currencyNameEn: 'Czech koruna',
        tinType: 'DIČ',
        tinName: 'Daňové identifikační číslo',
        officialLanguageCode: 'cs',
        officialLanguageNameEn: 'Czech',
        officialLanguageNameLocal: 'Čeština',
        countryCallingCode: '420',
        areaCodes: [],
        region: 'Europe',
        flag: '🇨🇿'
    }
}
