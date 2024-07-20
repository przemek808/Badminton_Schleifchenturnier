import { Player } from '@data/player/player'
import { Match } from '@data/tournament/tournament'

export function calculateMatches(
    previousMatches: Match[],
    players: Player[],
): Omit<Match, 'id' | 'round' | 'results'>[] {
    const unassignedPlayers = players.toSorted((a, b) => a.rating - b.rating)

    const matches: Omit<Match, 'id' | 'round'>[] = []

    while (unassignedPlayers.length >= 3) {
        const player1 = unassignedPlayers.pop() as Player
        const player2 = unassignedPlayers.pop() as Player
        const player3 = unassignedPlayers.pop() as Player
        const player4 = unassignedPlayers.pop() as Player

        matches.push({
            players: {
                team1: [player1, player4],
                team2: [player2, player3],
            },
            results: [],
        })
    }

    return matches
}
