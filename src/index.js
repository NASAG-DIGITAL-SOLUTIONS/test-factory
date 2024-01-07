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
 * @typedef {object} Return
 * @property {boolean} [error=false]
 * @property {string} [message]
 * @property {any} [data]
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

export { defaultOptions, consoles, styleToString }
