import { PlayerMutationPayload } from 'src/http-client/entities/player/player'

export function processCsv(csvText: string): PlayerMutationPayload[] {
    const rows = csvText.split('\n')

    const players = rows.map((row): PlayerMutationPayload | null => {
        const [name, strength] = row.split(',')

        if (name && strength) {
            return {
                name,
                rating: parseInt(strength),
            }
        }

        return null
    })

    return players.filter(
        (player): player is PlayerMutationPayload => player !== null,
    )
}
