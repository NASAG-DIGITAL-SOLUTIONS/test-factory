import { defaultOptions } from './index.js'

/** @typedef {{[attribute: string]: string}} Style */

/**
 * @namespace styles
 * @type {{[styleName: string]: Style}}
 */
const styles = {
    groupSuccess: {
        fontfamily: 'euclid_circular_a',
        display: 'inline-block',
        fontWeight: 'bold',
        padding: '3px 7px 3px 7px',
        borderRadius: '3px 3px 3px 3px'
    },
    groupError: {
        fontfamily: 'euclid_circular_a',
        display: 'inline-block',
        fontWeight: 'bold',
        padding: '3px 5px 3px 5px',
        borderRadius: '3px 3px 3px 3px'
    },
    success: {
        fontfamily: 'euclid_circular_a',
        display: 'inline-block',
        fontWeight: 'bold',
        padding: '3px 7px 3px 7px',
        borderRadius: '3px 3px 3px 3px',
        borderColor: 'black'
    },
    error: {
        fontfamily: 'euclid_circular_a',
        display: 'inline-block',
        fontWeight: 'bold',
        padding: '3px 5px 3px 5px',
        borderRadius: '3px 3px 3px 3px',
        borderColor: 'black'
    },
    tooltips_stringMatching: {
        display: 'none',
        fontfamily: 'euclid_circular_a',
        fontWeight: 'bold',
        padding: '3px 5px 3px 5px',
        borderRadius: '5px',
        color: '#ffffffcc',
        backgroundColor: '#aaaaaacc'
    }
}

/** @namespace consoles */
const consoles = {
    /**
     * Groupe success console log
     * @memberof consoles
     * @method groupSuccess
     * @param {string} text
     * @param {import('./index').Options} [options]
     * @returns {void}
     */
    groupSuccess(text, options) {
        return console.groupCollapsed(
            `%c ${text}`,
            styleToString('groupSuccess', options)
        )
    },
    /**
     * Groupe error console log
     * @memberof consoles
     * @method groupError
     * @param {string} text
     * @param {import('./index').Options} [options]
     * @returns {void}
     */
    groupError(text, options) {
        return console.groupCollapsed(
            `%c ${text}`,
            styleToString('groupError', options)
        )
    },
    /**
     * Success console log
     * @memberof consoles
     * @method success
     * @param {string} text
     * @param {import('./index').Options} [options]
     * @returns {void}
     */
    success(text, options) {
        return console.log(`%c ${text}`, styleToString('success', options))
    },
    /**
     * Error console log
     * @memberof consoles
     * @method error
     * @param {string} text
     * @param {import('./index').Options} [options]
     * @returns {void}
     */
    error(text, options) {
        return console.log(`%c ${text}`, styleToString('error', options))
    },
    /**
     * Clearing the console window
     * @param {boolean} clearBefore
     * @returns {void}
     */
    clear: (clearBefore) => {
        clearBefore && window.clear()
    }
}

/**
 * Converts CSS styles to string
 * @function styleToString
 * @param {string} styleName - any CSS styling object
 * @param {import('./index').Options} [options]
 * @returns {string} the converted style
 */
function styleToString(styleName, options) {
    const _options = { ...defaultOptions, ...options }

    switch (styleName) {
        case 'error':
            if (_options.console.hasBackground) {
                styles[styleName].color = '#ffffffcc'
                styles[styleName].backgroundColor = '#e0005acc'
            } else {
                styles[styleName].color = '#e0005acc'
                styles[styleName].backgroundColor = 'transparent'
            }
            break

        case 'success':
            if (_options.console.hasBackground) {
                styles[styleName].color = '#ffffffcc'
                styles[styleName].backgroundColor = '#5c9037cc'
            } else {
                styles[styleName].color = '#5c9037cc'
                styles[styleName].backgroundColor = 'transparent'
            }
            break

        case 'groupError':
            if (_options.console.hasBackground) {
                styles[styleName].color = '#ffffffcc'
                styles[styleName].backgroundColor = '#e5165acc'
            } else {
                styles[styleName].color = '#e5165acc'
                styles[styleName].backgroundColor = 'transparent'
            }
            break

        case 'groupSuccess':
            if (_options.console.hasBackground) {
                styles[styleName].color = '#ffffffcc'
                styles[styleName].backgroundColor = '#00aa00b3'
            } else {
                styles[styleName].color = '#00aa00b3'
                styles[styleName].backgroundColor = 'transparent'
            }
            break
    }

    return Object.keys(styles[styleName]).reduce(
        (acc, key) =>
            acc +
            key
                .split(/(?=[A-Z])/)
                .join('-')
                .toLowerCase() +
            ':' +
            styles[styleName][key] +
            ';',
        ''
    )
}

export { styleToString, styles, consoles }
