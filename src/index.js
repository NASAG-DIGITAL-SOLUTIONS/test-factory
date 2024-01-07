// import { z } from 'zod'
import countries from './countries.js'
import { consoles, styleToString, styles } from './consoles.js'
import './styles.css'

/**
 * Stats from the comparison of two phrases
 * @typedef {object} stringSimilarityStats
 * @property {number} similar
 * @property {number} someWhatSimilar
 * @property {number} notSimilar
 * @property {number} positionWarnning
 * @property {number} missing
 */

/**
 * The prefered return type for all functions in $tf
 * @typedef {object} ReturnErr
 * @property {true} error
 * @property {string} message
 */

/**
 * The prefered return type for all functions in $tf
 * @typedef {object} ReturnStr
 * @property {false} error
 * @property {string[]} [data]
 */

/**
 * The prefered return type for all functions in $tf
 * @typedef {object} ReturnNode
 * @property {false} error
 * @property {Node | HTMLCollectionOf<Element> | NodeListOf<HTMLElement> | HTMLCollection | HTMLElement} [data]
 */

/**
 * Similarity Matrice by word in a phrase
 * @typedef {Array.<{word: string, matrice: number[]}>} SimilarityMatrice
 */

/**
 * Options object - used by all methods
 * @typedef {object} Options
 * @property {number} elementIndex
 * @property {{upper: number, lower: number}} similarityIndex
 * @property {{clearBefore: boolean, hasBackground: boolean}} console
 */

/** @type {Options} */
const defaultOptions = {
    elementIndex: 0,
    similarityIndex: {
        upper: 0.6,
        lower: 0.3
    },
    console: {
        clearBefore: true,
        hasBackground: true
    }
}

/**
 * Assert's Array has at least one item of type other then 'String'
 * @param {any[]} values - Array of values to test
 * @returns {boolean} Boolean, true if any value is not of type String
 */
function notStrings(values) {
    if (!Array.isArray(values) || !values.length) return true
    return !values.every(
        (value) => typeof value === 'string' || value instanceof String
    )
}

/**
 * Get a DOM Element
 * @param {('class' | 'name' | 'id' | 'xpath')} targetSelector - enum - one of the supported selectors types
 * @param {string} targetPath - target element path
 * @param {number} [elementIndex=0] - when Element list is found, which element to handle - can be used with Name or ClassName
 * @returns {ReturnErr | ReturnNode} The target DOM Element
 */
function elementGetter(
    targetSelector,
    targetPath,
    elementIndex = defaultOptions.elementIndex
) {
    if (
        targetSelector == undefined ||
        null ||
        targetPath == undefined ||
        null
    ) {
        return {
            error: true,
            message: ' ❌ "targetSelector" and "targetPath" must be provided'
        }
    }

    let temp
    switch (targetSelector) {
        case 'id':
            temp = document.getElementById(targetPath)
            break
        case 'name':
            temp = document.getElementsByName(targetPath)[elementIndex]
            break
        case 'class':
            temp = document.getElementsByClassName(targetPath)[elementIndex]
            break
        case 'xpath':
            temp = document.evaluate(
                targetPath,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue
            break
        default:
            return {
                error: true,
                message:
                    ' ❌ Unsupported selector provided, please use either "Id", "Name", "ClassName" or "xPath"'
            }
    }

    if ((Array.isArray(temp) && temp.length == 0) || temp == null) {
        return {
            error: true,
            message: ` ❌ Element with the ${targetSelector}: "${targetPath}" was not found !`
        }
    } else {
        return {
            error: false,
            data: temp
        }
    }
}

/**
 *
 * @param {'class' | 'name' | 'id' | 'xpath'} targetSelector - enum - one of the supported selectors types
 * @param {string} targetPath - target element path
 * @returns {ReturnErr | ReturnNode | ReturnStr} The target Element text
 */
function targetText(targetSelector, targetPath) {
    /** @type {string[]} */
    const text = []

    const targetElement = elementGetter(targetSelector, targetPath)
    if (targetElement.error) {
        return targetElement
    }

    /** @type {string | undefined} */
    let targetType

    if (!targetElement.error && targetElement.data != null) {
        if (Array.isArray(targetElement.data)) {
            targetType = targetElement.data[0].nodeName
        } else {
            // @ts-ignore
            targetType = targetElement.data.nodeName
        }
    } else {
        return targetElement
    }

    switch (targetType) {
        case 'SELECT':
            Array.from(
                /** @type {HTMLSelectElement} */ (targetElement.data).options
            ).forEach((option) => text.push(option.label))
            break
        default: // FOR ALL SIMPLE HTML ELEMENTS WERE .INNERTEXT IS SUFFICIENT
            text.push(targetElement.data.toString())
            break
    }

    return {
        error: false,
        data: text
    }
}

export {
    defaultOptions,
    consoles,
    styleToString,
    notStrings,
    elementGetter,
    targetText
}
