/*
// Auf Artist (Taylor Swift) in Konsole zugreifen
async function loadArtist() {
    const url = 'https://im2.ebedemec.myhostpoint.ch/get-artist.php';
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
    const url = 'https://im2.ebedemec.myhostpoint.ch/get-artist-top-tracks.php';
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
*/

const genres = {
    pop: ['20244d07-534f-4eff-b4d4-930878889970', '7e9bd05a-117f-4cce-87bc-e011527a8b18', 'f82bcf78-5b69-4622-a5ef-73800768d9ac'],
    rock: ['e21857d5-3256-4547-afb3-4b6ded592596', '6ffb8ea9-2370-44d8-b678-e9237bbd347b', '64b94289-9474-4d43-8c93-918ccc1920d1', '73e5e69d-3554-40d8-8516-00cb38737a1c'],
    latin: ['5bdeb32d-56a5-4b6d-a768-264101fa0a0a', '89aa5ecb-59ad-46f5-b3eb-2d424e941f19', 'de22adae-f8ac-414f-b653-b0162611bd60'],
    electronic:['302bd7b9-d012-4360-897a-93b00c855680', '8dd98bdc-80ec-4e93-8509-2f46bafc09a7', 'c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5'],
}

async function loadArtistTopSongById(id) {
    const url = `https://www.theaudiodb.com/api/v1/json/123/track-top10-mb.php?s=${id}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
async function loadArtistDetailsById(id) {
    const url = `https://www.theaudiodb.com/api/v1/json/123/artist-mb.php?i=${id}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        const artists = [];
        const genre = button.getAttribute('id');
        const ids = genres[genre];
        for (const id of ids) {
            const artist_data = await loadArtistDetailsById(id);
            const artist_top_song = await loadArtistTopSongById(id);
            if (!artist_data || !artist_top_song || !artist_top_song.track.length || !artist_data.artists.length) {
                continue;
            }
            const data = {
                artist: artist_data.artists[0],
                top_song: artist_top_song.track[0]
            }
            artists.push(data);
        }
        console.log(artists);
        displayArtists(artists);
    });
});

const container = document.querySelector('#content');
function displayArtists(artists) {
    container.innerHTML = '';
    artists.forEach(details => {
        const track = details.top_song;
        const artist = details.artist;
        // -> create card
        const card = document.createElement('div');
        card.classList.add('card');

        // -> create image
        let mediaElement;
        if (artist.strArtistThumb) {
            mediaElement = document.createElement('img');
            mediaElement.src = artist.strArtistThumb;
        } else {
            mediaElement = document.createElement('div');
            mediaElement.classList.add('img');
        }

        // -> create title
        const titleElement = document.createElement('h3');
        titleElement.textContent = `${track.strTrack} | ${track.strAlbum}`;

        // -> create artist name
        const artistElement = document.createElement('p');
        artistElement.textContent = track.strArtist;

        // -> fill card
        card.appendChild(mediaElement);
        card.appendChild(titleElement);
        card.appendChild(artistElement);

        // -> add card to container
        container.appendChild(card);
    });
}