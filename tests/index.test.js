/**
 * @jest-environment jsdom
 */

// import { jest } from '@jest/globals'
// import puppeteer from 'puppeteer'
import * as core from '../src/index.js'

// jest.setTimeout(60000)

const STRING_TYPE_ERROR = {
    error: true,
    message: " ❌ the provided params must be of type 'string' !"
}
const LANG_NOT_DETECTED_ERROR = {
    error: true,
    message: ' ❌ The page language was not detected !'
}

describe('Test index.js', () => {
    /*
    beforeAll(async () => {
        const browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        await page.goto('https://google.com')
    })
    */

    it('should test notStrins() ', () => {
        expect(core.notStrings([])).toBe(true)
        expect(core.notStrings([''])).toBe(true)
        expect(core.notStrings(['', 2])).toBe(true)
        expect(core.notStrings([1, ''])).toBe(true)
        expect(core.notStrings([null, ''])).toBe(true)
        expect(core.notStrings([null, undefined])).toBe(true)
        expect(core.notStrings([undefined, undefined])).toBe(true)
        expect(core.notStrings(['', ''])).toBe(false)
        expect(core.notStrings(['edfverfv', 'edcve'])).toBe(false)
    })

    it('should test editDistance() ', () => {
        expect(core.editDistance('', '')).toBe(0)
        expect(core.editDistance('aa', 'aa')).toBe(0)
        expect(core.editDistance('aa', 'aaa')).toBe(1)
        expect(core.editDistance('aaa', 'aa')).toBe(1)
        expect(core.editDistance('ab', 'aaa')).toBe(2)
        expect(core.editDistance('aab', 'a')).toBe(2)
        expect(core.editDistance('', '')).toBe(0)
        expect(core.editDistance('a', 'fsdfgsdfgs fdfgd fgs')).toBe(20)
        expect(core.editDistance('aa00', '')).toBe(4)
        expect(core.editDistance('aa', 2)).toBe(2)
    })

    it('should test notStrins() ', () => {
        expect(null).toBeNull()
    })

    it('should test checkWording() ', async () => {
        expect(
            core.checkWording(
                'class',
                'notification-text',
                { FR: ['', 'fverve rver ve rve rv ev'] },
                {
                    similarityIndex: {
                        upper: 0.5,
                        lower: 0.4
                    },
                    console: {
                        clearBefore: false
                    }
                }
            )
        ).toMatchObject(LANG_NOT_DETECTED_ERROR)
    })
})
