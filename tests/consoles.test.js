/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals'
import { styleToString, consoles } from '../src/consoles.js'

describe('Test consoles.js', () => {
    it('should test styleToString() ', () => {
        expect(
            styleToString('error', { console: { hasBackground: false } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 5px 3px 5px;border-radius:3px 3px 3px 3px;border-color:black;color:#e0005acc;background-color:transparent;'
        )

        expect(
            styleToString('error', { console: { hasBackground: true } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 5px 3px 5px;border-radius:3px 3px 3px 3px;border-color:black;color:#ffffffcc;background-color:#e0005acc;'
        )

        expect(
            styleToString('success', { console: { hasBackground: false } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 7px 3px 7px;border-radius:3px 3px 3px 3px;border-color:black;color:#5c9037cc;background-color:transparent;'
        )

        expect(
            styleToString('success', { console: { hasBackground: true } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 7px 3px 7px;border-radius:3px 3px 3px 3px;border-color:black;color:#ffffffcc;background-color:#5c9037cc;'
        )

        expect(
            styleToString('groupError', { console: { hasBackground: false } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 5px 3px 5px;border-radius:3px 3px 3px 3px;color:#e5165acc;background-color:transparent;'
        )

        expect(
            styleToString('groupError', { console: { hasBackground: true } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 5px 3px 5px;border-radius:3px 3px 3px 3px;color:#ffffffcc;background-color:#e5165acc;'
        )

        expect(
            styleToString('groupSuccess', { console: { hasBackground: false } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 7px 3px 7px;border-radius:3px 3px 3px 3px;color:#00aa00b3;background-color:transparent;'
        )

        expect(
            styleToString('groupSuccess', { console: { hasBackground: true } })
        ).toBe(
            'fontfamily:euclid_circular_a;display:inline-block;font-weight:bold;padding:3px 7px 3px 7px;border-radius:3px 3px 3px 3px;color:#ffffffcc;background-color:#00aa00b3;'
        )
    })

    it('should test consoles() ', () => {
        const logSpy = jest.spyOn(console, 'log').mockReset()
        const logSpygroupCollapsed = jest
            .spyOn(console, 'groupCollapsed')
            .mockReset()

        consoles.groupSuccess('test group success', {
            console: { hasBackground: false }
        })
        consoles.groupError('test group error', {
            console: { hasBackground: true }
        })

        consoles.success('test log seccess', {
            console: { hasBackground: false }
        })
        consoles.error('test log error', {
            console: { hasBackground: true }
        })

        expect(logSpy).toHaveBeenCalledTimes(2)
        expect(logSpygroupCollapsed).toHaveBeenCalledTimes(2)
    })
})
