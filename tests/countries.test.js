/**
 * @jest-environment jsdom
 */

import * as countries from '../src/countries.js'

describe('Test countries.js', () => {
    const countryCodes = Object.keys(countries.default)

    it('should test number of countries ', () => {
        expect(countryCodes.length).toEqual(18)
    })

    it('should test all country codes exist ', () => {
        expect(countryCodes).toContain(
            'BH',
            'DE',
            'DK',
            'ES',
            'FR',
            'GR',
            'IT',
            'KW',
            'OM',
            'PL',
            'PT',
            'QA',
            'RO',
            'SA',
            'SE',
            'TR',
            'AE',
            'CZ'
        )
    })
    it('should test all country object have all properties ', () => {
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('countryNameEn')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('countryNameLocal')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('countryCode')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('currencyCode')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('currencyNameEn')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('tinType')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('tinName')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty(
                'officialLanguageCode'
            )
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty(
                'officialLanguageNameEn'
            )
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty(
                'officialLanguageNameLocal'
            )
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('countryCallingCode')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('areaCodes')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('region')
        )
        countryCodes.forEach((code) =>
            expect(countries.default[code]).toHaveProperty('flag')
        )
    })
})
