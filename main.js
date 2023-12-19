import { uploadCsvHandler, processCsv } from './upload.js';
import { addPlayerToList } from './playerManagement.js';
import { addNewRound, generatePairs, calculateResults } from './roundManagement.js';

let players = [];

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('uploadCsv').addEventListener('click', uploadCsvHandler);
    document.getElementById('addPlayer').addEventListener('click', () => addPlayerHandler(players));
    document.getElementById('addRound').addEventListener('click', () => addNewRound(players));
    document.getElementById('generatePairs').addEventListener('click', () => generatePairs(1, players));    

    // Initial call to start the first round with an empty players list
    addNewRound(players);
});

function addPlayerHandler(players) {
    const name = document.getElementById('playerName').value;
    const strength = document.getElementById('playerStrength').value;
    if (name && strength) {
        addPlayerToList(name, strength);
        players.push({ name, strength: parseInt(strength), won: false, score: 0 });
        document.getElementById('playerName').value = '';
        document.getElementById('playerStrength').value = '';
    } else {
        alert("Bitte geben Sie einen Namen und eine Stärke ein.");
    }
}

export function addPlayerToGlobalList(player) {
    players.push(player);
}

