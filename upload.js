import { addPlayerToList } from './playerManagement.js';
import { addPlayerToGlobalList } from './main.js';

export function uploadCsvHandler() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            processCsv(text);
        };
        reader.onerror = function() {
            alert("Fehler beim Lesen der Datei.");
        };
        reader.readAsText(file);
    } else {
        alert("Bitte wählen Sie eine CSV-Datei aus.");
    }
}

export function processCsv(csvText) {
    const rows = csvText.split('\n');
    rows.forEach(row => {
        const [name, strength] = row.split(',');
        if (name && strength) {
            addPlayerToList(name.trim(), parseInt(strength.trim()));
            addPlayerToGlobalList({ name: name.trim(), strength: parseInt(strength.trim()), won: false, score: 0 });
        }
    });
}

