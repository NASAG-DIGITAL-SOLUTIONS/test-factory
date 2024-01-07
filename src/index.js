import countries from './countries.js'
import { consoles, styleToString, styles } from './consoles.js'
import { levenshteinDistance } from './algorithms.js'
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

        // FOR ALL SIMPLE HTML ELEMENTS WERE .INNERTEXT IS SUFFICIENT
        default:
            // @ts-ignore
            text.push(targetElement.data.innerText)
            break
    }

    return {
        error: false,
        data: text
    }
}

/**
 * Calculate the diffrence between two Strings
 * @param {string} longest - the longest string provided first
 * @param {string} shortest - the shortest string provided second
 * @returns {number} the difference between two Strings
 */
function editDistance(longest, shortest) {
    const costs = []
    for (let i = 0; i <= longest.length; i++) {
        let lastValue = i
        for (let j = 0; j <= shortest.length; j++) {
            if (i == 0) costs[j] = j
            else {
                if (j > 0) {
                    let newValue = costs[j - 1]
                    if (longest.charAt(i - 1) != shortest.charAt(j - 1)) {
                        newValue =
                            Math.min(Math.min(newValue, lastValue), costs[j]) +
                            1
                    }
                    costs[j - 1] = lastValue
                    lastValue = newValue
                }
            }
        }
        if (i > 0) costs[shortest.length] = lastValue
    }
    return costs[shortest.length]
}

/**
 * Calculat the similatity between two Strings using Levenshtein Distance Algorithm
 * @param {string} [source=''] - String from testData
 * @param {string} [target=''] - String from targetElement
 * @returns {number} a "Simitarity Scoore" from 0 to 1
 */
function similarity(source = '', target = '') {
    if (target == null) target = ''
    if (source == null) source = ''
    const shortLongest = [source, target].sort(function (a, b) {
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        return b.length - a.length
    })

    if (shortLongest[0].length == 0) return 1.0
    return (
        (shortLongest[0].length -
            editDistance(shortLongest[0], shortLongest[1])) /
        shortLongest[0].length
    )
}

/**
 * Calculate the similarity of two string and the strings to booth sides of the array
 * in function of the diffrence between the two arrays
 * @example
 * rangeSimilarity('str', ['str-2', 'str-1', 'str', 'str+1', 'str+2'], 3, 2);
 * returns [0.5, 0.7, 0, 0.1, 0]
 * @param {string} targetWord
 * @param {string[]} sourceWords
 * @param {number} wordIndex
 * @param {number} diff
 * @returns {number[]}
 */
function rangeSimilarity(targetWord, sourceWords, wordIndex, diff) {
    const similarities = []
    for (let i = wordIndex - diff; i <= wordIndex + diff; ++i) {
        similarities.push(similarity(targetWord, sourceWords[i]))
    }
    return similarities
}

/**
 * Find the index of the closest string to 'target' in 'sources'
 * @param {string} target - The phrase to find a match for
 * @param {string[]} sources - The test data to test against
 * @returns {number} the index of the closest string to 'target' in 'sources'
 */
function matchTargetToSource(target, sources) {
    const similarityScores = sources.map((source) => similarity(source, target))
    const bestSourceIndex = similarityScores.indexOf(
        Math.max.apply(null, similarityScores)
    )
    return bestSourceIndex
}

export {
    defaultOptions,
    consoles,
    styleToString,
    notStrings,
    elementGetter,
    targetText,
    editDistance,
    levenshteinDistance,
    similarity,
    rangeSimilarity,
    matchTargetToSource
}
