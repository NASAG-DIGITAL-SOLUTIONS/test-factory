/**
 * @jest-environment jsdom
 */

import * as algos from '../src/algorithms.js'

describe('Test algorithms.js', () => {
    it('should test levenshteinDistance() ', () => {
        expect(algos.levenshteinDistance('', '')).toBe(0)
        expect(algos.levenshteinDistance('aa', 'aa')).toBe(0)
        expect(algos.levenshteinDistance('aa', 'aaa')).toBe(1)
        expect(algos.levenshteinDistance('aaa', 'aa')).toBe(1)
        expect(algos.levenshteinDistance('ab', 'aaa')).toBe(2)
        expect(algos.levenshteinDistance('aab', 'a')).toBe(2)
        expect(algos.levenshteinDistance('', '')).toBe(0)
        expect(algos.levenshteinDistance('a', 'fsdfgsdfgs fdfgd fgs')).toBe(20)
        expect(algos.levenshteinDistance('aa00', '')).toBe(4)
        expect(algos.levenshteinDistance()).toBe(0)
    })
})
