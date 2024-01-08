export function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', function() {

let stopwatchInterval;
let elapsedTime = 0;
let isRunning = false;

document.getElementById('setTimer').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    elapsedTime = (minutes * 60 + seconds) * 1000;
    document.getElementById('timer').textContent = formatTime(elapsedTime);
});


document.getElementById('startTimer').addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(function() {
            elapsedTime -= 1000;
            if (elapsedTime <= 0) {
                clearInterval(stopwatchInterval);
                elapsedTime = 0;
                isRunning = false;
            }
            document.getElementById('timer').textContent = formatTime(elapsedTime);
        }, 1000);
    }
});

document.getElementById('stopTimer').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    isRunning = false;
    document.getElementById('timer').textContent = formatTime(elapsedTime);
});

document.getElementById('pauseTimer').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    isRunning = false;
});

});
