import { addPlayerToList } from './playerManagement.js';

export function addNewRound(players) {
    const currentRoundNumber = document.querySelectorAll('.round').length + 1;
    const roundDiv = document.createElement('div');
    roundDiv.id = `round${currentRoundNumber}`;
    roundDiv.classList.add('round');
    roundDiv.innerHTML = `<h2>Runde ${currentRoundNumber}</h2><div id="pairs${currentRoundNumber}"></div>`;
    document.body.appendChild(roundDiv);

    if (currentRoundNumber > 1) {
        players = calculateResults(currentRoundNumber - 1, players);
    }
    generatePairs(currentRoundNumber, players);
}

export function calculateResults(previousRoundNumber, players) {
    const playerElements = Array.from(document.querySelectorAll('#playerList li'));

    const results = Array.from(document.querySelectorAll(`#round${previousRoundNumber} .result`)).map(input => input.value.split(':').map(Number));
    results.forEach((result, index) => {
        if (result.length === 2) {
            const winnerIndex = result[0] > result[1] ? index * 2 : index * 2 + 1;
            players[winnerIndex].won = true;
        }
    });

    // Markieren Sie die Spieler mit einem Freilos als Gewinner
    if (players.length % 2 !== 0) {
        players.find(player => !player.won).won = true;
    }

    return players;
}

export function generatePairs(roundNumber, players) {
    // Sortieren der Spieler nach Stärke
    players.sort((a, b) => b.strength - a.strength);

    const pairsDiv = document.getElementById(`pairs${roundNumber}`);
    pairsDiv.innerHTML = '';

    // Generieren der Paarungen mit ausgeglichener Teamstärke
    while (players.length > 3) { // Benötigt mindestens 4 Spieler für 2 Teams
        const team1Player1 = players.shift();
        const team1Player2 = findBestMatchForTeam(team1Player1, players);
        players.splice(players.indexOf(team1Player2), 1); // Entferne den ausgewählten Spieler

        const team2Player1 = players.shift();
        const team2Player2 = findBestMatchForTeam(team2Player1, players);
        players.splice(players.indexOf(team2Player2), 1); // Entferne den ausgewählten Spieler

        let pair = `${team1Player1.name} & ${team1Player2.name} vs ${team2Player1.name} & ${team2Player2.name}`;
        pairsDiv.innerHTML += `<div>${pair} - Ergebnis: <input type="text" class="result"></div>`;
    }
}


function findBestTeamMatch(player, players) {
    let bestMatchIndex = -1;
    let minStrengthDiff = Infinity;

    for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
            const teamStrength = player.strength + players[i].strength;
            const opponentTeamStrength = players[j].strength + (players[j + 1] ? players[j + 1].strength : 0);
            const strengthDiff = Math.abs(teamStrength - opponentTeamStrength);

            if (strengthDiff < minStrengthDiff) {
                minStrengthDiff = strengthDiff;
                bestMatchIndex = j;
            }
        }
    }

    if (bestMatchIndex !== -1) {
        // Gefundene Spieler für das gegnerische Team
        return [players[bestMatchIndex], players[bestMatchIndex + 1] ? players.splice(bestMatchIndex + 1, 1)[0] : null].filter(player => player != null);
    }

    // Kein passendes Team gefunden
    return [null, null];
}


