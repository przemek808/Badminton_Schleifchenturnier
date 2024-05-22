import { Player } from '@data/player/player'

export function processCsv(csvText: string): Player[] {
    const rows = csvText.split('\n')

    const players = rows.map((row): Player | null => {
        const [name, strength] = row.split(',')

        if (name && strength) {
            return {
                name,
                rating: parseInt(strength),
            }
        }

        return null
    })

    return players.filter((player): player is Player => player !== null)
}
