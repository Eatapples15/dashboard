const gridContainer = document.querySelector('.grid-container');
let numberOfSites = 0; // Tiene traccia del numero corrente di siti visualizzati

function createIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    return iframe;
}

function populateGrid(numSites) {
    gridContainer.innerHTML = ''; // Pulisce la griglia esistente
    for (let i = 0; i < numSites; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        // Qui potresti implementare una logica per chiedere all'utente l'URL per ogni box
        // Per ora, inseriamo degli URL di esempio
        let url = prompt(`Inserisci l'URL del sito ${i + 1}:`, 'https://www.google.com');
        if (url) {
            gridItem.appendChild(createIframe(url));
            gridContainer.appendChild(gridItem);
        } else {
            // Se l'utente annulla o non inserisce un URL, non aggiungiamo il box
            numSites--; // Decrementa il numero di siti da visualizzare
        }
    }
    numberOfSites = numSites;
}

function setGrid(numColumns) {
    gridContainer.classList.remove('grid-4', 'grid-6', 'grid-8');
    if (numColumns === 4) {
        gridContainer.classList.add('grid-4');
        populateGrid(4);
    } else if (numColumns === 6) {
        gridContainer.classList.add('grid-6');
        populateGrid(6);
    } else if (numColumns === 8) {
        gridContainer.classList.add('grid-8');
        populateGrid(8);
    }
}

// Imposta la griglia iniziale a 4 siti al caricamento della pagina
setGrid(4);
