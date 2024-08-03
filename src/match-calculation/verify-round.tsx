import { Match } from '@data/match/match'

export function isRoundValid(matches: Match[], minNumberResults: number = 2) {
    const hasLessThanMinimalResults = matches.some(
        (match) => match.results.length < minNumberResults,
    )

    if (hasLessThanMinimalResults) {
        return false
    }

    return true
}
