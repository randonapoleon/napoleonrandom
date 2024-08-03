const factions = ["France", "Spain", "Great Britain", "Portugal", "Sweden", "Ottoman Empire", "Denmark", "Austria", "Russia", "Prussia", "Netherlands"];
const maps = ["Amazon Confluence", "Aosta Valley", "Arid Cliffs", "Austrian Pinnacles", "Galician Ria", "Grassy Flatlands", "Homestead", "Italian Grassland", "Prussian Hills", "Pyrenees Peak", "Salamanca Province", "Savoy Hilltop", "Siberian Plateau", "Sunken Jungle", "Syrian Ridge"];
const maps2v2Only = ["Pyramids", "Spanish Lakeside", "Tabuk Mesa", "Amazon Confluence", "Aosta Valley", "Arid Cliffs", "Austrian Pinnacles", "Galician Ria", "Grassy Flatlands", "Homestead", "Italian Grassland", "Prussian Hills", "Pyrenees Peak", "Salamanca Province", "Savoy Hilltop", "Siberian Plateau", "Sunken Jungle", "Syrian Ridge"];
const maps1v1Only = ["Pyramids", "Spanish Lakeside", "Tabuk Mesa", "Amazon Confluence", "Aosta Valley", "Arid Cliffs", "Austrian Pinnacles", "Galician Ria", "Grassy Flatlands", "Homestead", "Italian Grassland", "Prussian Hills", "Pyrenees Peak", "Salamanca Province", "Savoy Hilltop", "Siberian Plateau", "Sunken Jungle", "Syrian Ridge"];
const mapImages = {
    "Amazon Confluence": "images/amazon_confluence.jpg",
    "Aosta Valley": "images/aosta_valley.jpg",
    "Arid Cliffs": "images/arid_cliffs.jpg",
    "Austrian Pinnacles": "images/austrian_pinnacles.jpg",
    "Galician Ria": "images/galician_ria.jpg",
    "Grassy Flatlands": "images/grassy_flatlands.jpg",
    "Homestead": "images/homestead.jpg",
    "Italian Grassland": "images/italian_grassland.jpg",
    "Prussian Hills": "images/prussian_hills.jpg",
    "Pyrenees Peak": "images/pyrenees_peak.jpg",
    "Salamanca Province": "images/salamanca_province.jpg",
    "Savoy Hilltop": "images/savoy_hilltop.jpg",
    "Siberian Plateau": "images/siberian_plateau.png",
    "Sunken Jungle": "images/sunken_jungle.jpg",
    "Syrian Ridge": "images/syrian_ridge.jpg",
    "Pyramids": "images/Pyramids.jpg",
    "Spanish Lakeside": "images/spanish_lakeside.jpg",
    "Tabuk Mesa": "images/tabuk_mesa.jpg"
};

let playerNames = [];
let randomizedTeams = [];
let mode = '1v1';
let timerInterval;

function updatePlayerInputs() {
    mode = document.getElementById('mode').value;
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';

    let numPlayers;
    if (mode === '1v1') {
        numPlayers = 2;
    } else if (mode === '2v2') {
        numPlayers = 4;
    } else if (mode === '3v3') {
        numPlayers = 6;
    }

    for (let i = 0; i < numPlayers; i++) {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerHTML = `
            <label for="player${i + 1}">Player ${i + 1}:</label>
            <input type="text" id="player${i + 1}" placeholder="Enter name">
        `;
        playersDiv.appendChild(playerDiv);
    }
}

function getPlayerNames() {
    playerNames = [];
    const numPlayers = mode === '1v1' ? 2 : mode === '2v2' ? 4 : 6;
    for (let i = 0; i < numPlayers; i++) {
        const playerName = document.getElementById(`player${i + 1}`).value;
        playerNames.push(playerName);
    }
}

function randomize() {
    Math.seedrandom(new Date().getTime().toString()); // Seed RNG
    getPlayerNames();
    randomizedTeams = shuffle([...playerNames]); // Ensure players are shuffled
    displayResults();
    document.getElementById('revengeButton').disabled = false;
}

function revenge() {
    displayResults();
}

function displayResults() {
    const resultDiv = document.getElementById('result');
    const mapImageDiv = document.getElementById('mapImage');
    const numPlayers = mode === '1v1' ? 2 : mode === '2v2' ? 4 : 6;
    let availableMaps = [...maps];
    if (mode === '2v2') availableMaps = availableMaps.concat(maps2v2Only);
    else if (mode === '1v1') availableMaps = availableMaps.concat(maps1v1Only);
    const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)];
    const noCivilWar = document.getElementById('noCivilWarCheckbox').checked;
    const selectedFactions = selectFactions(numPlayers, noCivilWar);

    let resultText = `Randomized Map: ${randomMap}\n\n`;
    for (let i = 0; i < numPlayers / 2; i++) {
        resultText += `Team 1 - Player ${i + 1} (${randomizedTeams[i]}): ${selectedFactions[i]}\n`;
    }
    resultText += `\n`;
    for (let i = numPlayers / 2; i < numPlayers; i++) {
        resultText += `Team 2 - Player ${i + 1} (${randomizedTeams[i]}): ${selectedFactions[i]}\n`;
    }

    resultDiv.innerText = resultText;
    mapImageDiv.innerHTML = `<img src="${mapImages[randomMap]}" alt="${randomMap}">`;
}

function selectFactions(numPlayers, noCivilWar) {
    const shuffledFactions = shuffle(factions.slice());
    if (!noCivilWar || numPlayers <= 2) {
        return shuffledFactions.slice(0, numPlayers);
    }
    const team1Factions = shuffledFactions.slice(0, numPlayers / 2);
    const team2Factions = shuffledFactions.slice(numPlayers / 2, numPlayers);
    while (team1Factions.some(faction => team2Factions.includes(faction))) {
        shuffle(team2Factions);
    }
    return team1Factions.concat(team2Factions);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function updateClock() {
    const clockDiv = document.getElementById('clock');
    const now = new Date();
    const hours = now.getUTCHours().toString().padStart(2, '0');
    const minutes = now.getUTCMinutes().toString().padStart(2, '0');
    const seconds = now.getUTCSeconds().toString().padStart(2, '0');
    clockDiv.innerText = `UTC Time: ${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    clearInterval(timerInterval);
    let timeRemaining = 60;
    timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
        const seconds = (timeRemaining % 60).toString().padStart(2, '0');
        document.getElementById('timerDisplay').innerText = `${minutes}:${seconds}`;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timerSound').play();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timerDisplay').innerText = "01:00";
}

document.addEventListener('DOMContentLoaded', (event) => {
    updatePlayerInputs();
    setInterval(updateClock, 1000);
});
