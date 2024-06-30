let timerElement = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsElement = document.getElementById('laps');
let laps = [];

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

// Event listener for the start button
startButton.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
});

// Event listener for the stop button
stopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
});

// Event listener for the reset button
resetButton.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timerElement.innerHTML = "00:00:00";
    laps = [];
    lapsElement.innerHTML = '';
});

// Event listener for the lap button
lapButton.addEventListener('click', () => {
    if (running) {
        const lapTime = timerElement.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsElement.appendChild(lapElement);
    }
});


function updateTime() {
    updatedTime = new Date().getTime() - startTime;

    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);

    timerElement.innerHTML =
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + ':' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}
