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
 * @property {string[]} data
 */

/**
 * The prefered return type for all functions in $tf
 * @typedef {object} ReturnNode
 * @property {false} error
 * @property {Node | HTMLCollectionOf<Element> | NodeListOf<HTMLElement> | HTMLCollection | HTMLElement} data
 */

/**
 * Similarity Matrice by word in a phrase
 * @typedef {[string, number[]]} SimilarityMatrice
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
 * @returns {ReturnErr | ReturnStr} The target Element text
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
        return {
            error: true,
            message:
                " ❌ mhh 🫤, we can't determine the target element type, please try some other way !"
        } //targetElement
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

/**
 *
 * @param {'class' | 'name' | 'id' | 'xpath'} targetSelector - enum - one of the supported selectors types.
 * @param {string} targetPath - target element path.
 * @param {Object.<string, string[]>} testData - test data by local.
 * @param {Options} [options]
 * @return {ReturnErr | ReturnStr | string}
 */
function checkWording(targetSelector, targetPath, testData = {}, options) {
    // NOTHIG GOES BEFORE THIS LINE
    const _options = { ...defaultOptions, ...options }

    consoles.clear(_options.console.clearBefore)

    /** @type {string} */
    let targetLocale
    const htmlLang = document
        .getElementsByTagName('html')
        .item(0)
        ?.getAttribute('lang')
    if (htmlLang == null || htmlLang == undefined) {
        return {
            error: true,
            message: ' ❌ The page language was not detected !'
        }
    } else {
        targetLocale = htmlLang
    }

    /** @type {stringSimilarityStats} */
    const stats = {
        similar: 0,
        someWhatSimilar: 0,
        notSimilar: 0,
        positionWarnning: 0,
        missing: 0
        // extra: 0
    }

    const targetWording = targetText(targetSelector, targetPath)
    if (targetWording.error) {
        return targetWording
    }

    // checking for input errors
    switch (true) {
        case testData[targetLocale] == undefined:
            return {
                error: true,
                message: ' ❌ Test data for the current locale was not found !'
            }
        case Object.values(_options.similarityIndex).some(
            (option) => typeof option !== 'number'
        ) ||
            Object.values(_options.similarityIndex).some(
                (option) => option < 0 || option > 1
            ):
            return {
                error: true,
                message:
                    ' ❌ similarity indexes (upper & lower) must be a number, between 0 and 1 !'
            }
        case notStrings(testData[targetLocale]):
            return {
                error: true,
                message: ` ❌ Test data for ${
                    countries[targetLocale.toUpperCase()].countryNameEn
                } ${
                    countries[targetLocale.toUpperCase()].flag
                } have values that are not String !`
            }
        case notStrings(targetWording.data):
            return {
                error: true,
                message: ' ❌ The target element doesnt containe ONLY strings'
            }
    }

    /** @type {string[]} */
    const targetWords = targetWording.data[0].split(' ')

    /** @type {string[]} */
    const sourceWords =
        testData[targetLocale][
            matchTargetToSource(targetWording.data[0], testData[targetLocale])
        ].split(' ')

    // const longest = Math.max(...[sourceWords.length, targetWords.length])

    /** @type {string[]} */
    const cssRules = []
    /** @type {{text: string, status: 0 | 1 | 2 | 3 | 4}[]} */
    const testedWords = []

    const diff = Math.abs(sourceWords.length - targetWords.length)

    /** @type {SimilarityMatrice[]} */
    const targetSimilarityMatrice = targetWords.map((targetWord, index) => [
        targetWord,
        rangeSimilarity(targetWord, sourceWords, index, diff)
    ])

    /** @type {SimilarityMatrice[]} */
    const sourceSimilarityMatrice = sourceWords.map((sourceWord, index) => [
        sourceWord,
        rangeSimilarity(sourceWord, targetWords, index, diff)
    ])

    // [CONDINIONAL] Injecting the missing words in targetWording
    if (diff > 0) {
        /** @type {{index: number; data: SimilarityMatrice}[]} */
        let diffMatrice = []

        sourceSimilarityMatrice
            .map(
                (array, index) =>
                    array[1].every(
                        (value) => value < _options.similarityIndex.upper
                    ) && {
                        /** @type {number} */
                        index: index,
                        /** @type {SimilarityMatrice} */
                        data: [array[0], array[1].fill(0)]
                    }
            )
            .forEach((item) => {
                if (item) diffMatrice.push(item)
            })

        if (diffMatrice.length > diff) {
            diffMatrice.sort(function (a, b) {
                const aa = Math.max(...a.data[1])
                const bb = Math.max(...b.data[1])
                return aa - bb
            })
            diffMatrice = diffMatrice.slice(0, diff)
        }

        diffMatrice.forEach((item) =>
            targetSimilarityMatrice.splice(item.index, 0, item.data)
        )
    }

    for (let i = 0; i < targetSimilarityMatrice.length; ++i) {
        switch (true) {
            case targetSimilarityMatrice[i][1][diff] == 1:
                cssRules.push('color: green')
                testedWords.push({
                    text: targetSimilarityMatrice[i][0],
                    status: 0
                })
                stats.similar += 1
                break

            case targetSimilarityMatrice[i][1].some(
                (value) => value < 1 && value >= _options.similarityIndex.upper
            ):
                testedWords.push({
                    text: targetSimilarityMatrice[i][0],
                    status: 2
                })
                cssRules.push(
                    'color:white; background: red; font-style: italic; text-decoration: underline'
                )
                stats.someWhatSimilar += 1
                break

            case targetSimilarityMatrice[i][1].some(
                (value) => value >= _options.similarityIndex.upper
            ):
                // Calculate position shift / string displacement direction
                const strSide =
                    targetSimilarityMatrice[i][1].indexOf(
                        Math.max(...targetSimilarityMatrice[i][1])
                    ) > Math.floor(targetSimilarityMatrice[i][1].length / 2)
                        ? '<-'
                        : '->'

                cssRules.push('color: orange;')
                testedWords.push({
                    text: `${strSide}${targetSimilarityMatrice[i][0]}`,
                    status: 3
                })
                stats.positionWarnning += 1
                break

            case targetSimilarityMatrice[i][1].every(
                (item) => item < _options.similarityIndex.lower
            ):
                cssRules.push(
                    'color: red; background: gray; font-style: italic; text-decoration: underline'
                )
                testedWords.push({
                    text: `[${targetSimilarityMatrice[i][0]}]`,
                    status: 4
                })
                stats.missing += 1
                break

            default:
                cssRules.push(
                    'color: white; background: red; font-style: italic; text-decoration: line-through'
                )
                testedWords.push({
                    text: targetSimilarityMatrice[i][0],
                    status: 1
                })
                stats.notSimilar += 1
                break
        }
    }

    // injectTooltip('string-matching', targetSelector, targetPath, testedWords)

    console.info(
        testedWords.map((word) => `%c${word.text}`).join(' '),
        ...cssRules
    )

    console.table(stats)

    return `✅ All Done, see stats above for ${
        countries[targetLocale.toUpperCase()].countryNameEn
    } ${countries[targetLocale.toUpperCase()].flag}`
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
    matchTargetToSource,
    checkWording
}
