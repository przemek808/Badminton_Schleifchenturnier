import { Player } from './player'

export type PlayerEntity = {
    create(player: Player): Promise<Player>
    delete(name: string): Promise<void>
    get(name: string): Promise<Player>
    getAll(): Promise<Player[]>
    update(name: string, changeSet: Partial<Player>): Promise<Player>
}

const data: Record<string, Player> = {}

function isPlayerExisting(name: string): boolean {
    return Object.keys(data).includes(name)
}

export const playerEntity: PlayerEntity = {
    async create(player) {
        if (isPlayerExisting(player.name)) {
            throw new Error(
                `Can't create new player. Player with name "${player.name}" already exists!`,
            )
        }

        data[player.name] = { ...player }

        return { ...player }
    },
    async delete(name) {
        if (!isPlayerExisting(name)) {
            throw new Error('Player is not existing')
        }

        delete data[name]
    },
    async get(name) {
        if (!isPlayerExisting(name)) {
            throw new Error('Player is not existing')
        }

        return { ...data[name] }
    },
    async getAll() {
        return Object.values(data)
    },
    async update(name, changeSet) {
        if (!isPlayerExisting(name)) {
            throw new Error(
                `Can't update player. Player with name "${name}" is not existing!`,
            )
        }

        const player = data[name]
        const updatedPlayer = { ...player, ...changeSet }

        data[name] = updatedPlayer

        return { ...updatedPlayer }
    },
}
