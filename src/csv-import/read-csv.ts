import { Player } from '@data/player/player'
import { processCsv } from './process-csv'
import { storage } from '@data/storage'
import { createPlayer } from '@components/forms/create-player/create'

export function readCsv(file: File) {
    const reader = new FileReader()

    reader.onload = function (e) {
        const text = e.target?.result
        if (text) {
            const players = processCsv(text.toString())

            // TODO: extract from module

            players.forEach((player) => createPlayer(player))
        }
    }
    reader.onerror = function () {
        alert('Fehler beim Lesen der Datei.')
    }
    reader.readAsText(file)
}
