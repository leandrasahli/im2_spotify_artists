// Auf Genres in Konsole zugreifen
async function loadGenres() {
    const url = 'http://localhost:8000/get-genres.php';
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const genreData = await loadGenres();
console.log(genreData);

// Auf Artist (Taylor Swift) in Konsole zugreifen
async function loadArtist() {
    const url = 'http://localhost:8000/get-artist.php';
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const artistData = await loadArtist();
console.log(artistData);

// Auf Artist's Top Tracks (Taylor Swift) in Konsole zugreifen
async function loadTopTracks() {
    const url = 'http://localhost:8000/get-artist-top-tracks.php';
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const toptracksData = await loadTopTracks();
console.log(toptracksData);

// Artist (Taylor Swift) Daten darstellen
const container = document.querySelector('#content');

const item = document.createElement('div');
item.classList.add('artist-card');
            
const artistName = document.createElement('h2');
artistName.innerText = artistData.item.name;

const image = document.createElement('img');
image.src = artistData.item.images[0].url;
image.alt = `Bild von ${artistData.item.name}`;
            
item.appendChild(image);
item.appendChild(artistName);

const title = document.createElement('h3');
title.innerText = "Top 3 Tracks";
item.appendChild(title);

toptracksData.items.slice(0, 3).forEach((track, index) => {
    const p = document.createElement('p');
    p.innerText = `${index + 1}. ${track.name}`;
    item.appendChild(p);
});

container.appendChild(item);