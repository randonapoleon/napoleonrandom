const factions = [
    "France", "Spain", "Great Britain", "Portugal", "Sweden", "Ottoman Empire", 
    "Denmark", "Austria", "Russia", "Prussia", "Netherlands"
];
const maps = [
    "Amazon Confluence", "Aosta Valley", "Arid Cliffs", "Austrian Pinnacles", 
    "Galician Ria", "Grassy Flatlands", "Homestead", "Italian Grassland", 
    "Prussian Hills", "Pyrenees Peak", "Salamanca Province", 
    "Savoy Hilltop", "Siberian Plateau", "Sunken Jungle", 
    "Syrian Ridge"
];
const maps2v2Only = [
    "Pyramids", "Spanish Lakeside", "Tabuk Mesa"
];

const mapImages = {
    "Amazon Confluence": "amazon_confluence.jpg",
    "Aosta Valley": "aosta_valley.jpg",
    "Arid Cliffs": "arid_cliffs.jpg",
    "Austrian Pinnacles": "austrian_pinnacles.jpg",
    "Galician Ria": "galician_ria.jpg",
    "Grassy Flatlands": "grassy_flatlands.jpg",
    "Homestead": "homestead.jpg",
    "Italian Grassland": "italian_grassland.jpg",
    "Prussian Hills": "prussian_hills.jpg",
    "Pyrenees Peak": "pyrenees_peak.jpg",
    "Salamanca Province": "salamanca_province.jpg",
    "Savoy Hilltop": "savoy_hilltop.jpg",
    "Siberian Plateau": "siberian_plateau.png",
    "Sunken Jungle": "sunken_jungle.jpg",
    "Syrian Ridge": "syrian_ridge.jpg",
    "Pyramids": "pyramids.jpg",
    "Spanish Lakeside": "spanish_lakeside.jpg",
    "Tabuk Mesa": "tabuk_mesa.jpg"
};

let playerNames = [];
let randomizedTeams = [];
let mode = '1v1';

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
    getPlayerNames();
    shuffle(playerNames);
    randomizedTeams = [...playerNames];
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
    if (mode === '2v2') {
        availableMaps = availableMaps.concat(maps2v2Only);
    }
    const randomMap = availableMaps[Math.floor(Math.random() * availableMaps.length)];
    const selectedFactions = shuffle(factions.slice()).slice(0, numPlayers);

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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize player inputs for the default game mode
updatePlayerInputs();
