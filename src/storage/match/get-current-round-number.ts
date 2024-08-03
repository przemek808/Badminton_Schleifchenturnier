import { Match } from './match'

export function getCurrentRoundNumber(matches: Match[]): number {
    if (matches.length === 0) {
        return 0
    }

    const roundNumbers = matches.map((match) => match.round)

    return Math.max(...roundNumbers)
}
