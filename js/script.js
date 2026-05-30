const genres = {
    rock: ['9c9f1380-2516-4fc9-a3e6-f9f61941d090', 'b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d', '4753fcb7-9270-493a-974d-8daca4e49125', '23a03e33-a603-404e-bcbf-2c00159d7067', 'bd13909f-1c29-4c27-a874-d4aaf27c5b1a', '8bfac288-ccc5-448d-9573-c33ea2aa5c30', '012151a8-0f9a-44c9-997f-ebd68b5389f9',  '5b11f4ce-a62d-471e-81fc-a69a8278c7da', 'ada7a83c-e3e1-40f1-93f9-3e73dbc9298a', 'a6c6897a-7415-4f8d-b5a5-3a5e05f3be67', 'a74b1b7f-71a5-4011-9441-d0b5e4122711', '0383dadf-2a4e-4d10-a46a-e9e041da8eb3', '65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab', '67f66c07-6e61-4026-ade5-7e782fad3a5d', 'f59c5520-5f46-4d2c-b2c4-822eabf53419', '90744b3e-363a-458e-8da1-e3e392a489c4', '3547f34a-db02-4ab7-b4a0-380e1ef951a9', '5fee3020-513b-48c2-b1f7-4681b01db0c6', '084308bd-1654-436f-ba03-df6697104e19', '66c662b6-6e2f-4930-8610-912e24c63ed1'],
    electronic:['302bd7b9-d012-4360-897a-93b00c855680', '8dd98bdc-80ec-4e93-8509-2f46bafc09a7', 'c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5'],
    pop: ['20244d07-534f-4eff-b4d4-930878889970', '7e9bd05a-117f-4cce-87bc-e011527a8b18', 'f82bcf78-5b69-4622-a5ef-73800768d9ac'],
    latin: ['5bdeb32d-56a5-4b6d-a768-264101fa0a0a', '89aa5ecb-59ad-46f5-b3eb-2d424e941f19', 'de22adae-f8ac-414f-b653-b0162611bd60', 'bf24ca37-25f4-4e34-9aec-460b94364cfc', '95bad1d4-ba1f-4060-940b-d415d66e934e', 'd606b860-cc03-4959-a3fd-3a24bccf2560', 'eaee97f6-f2e4-414a-966c-f31a1fb4696a', '75e4f8ef-34c3-44fd-8467-88a7d9599f77', 'f2651b63-a44d-4d1d-ba64-d981d971ecd1', 'e8979f75-9110-4df8-ac70-898898d080d1', '87a75fc3-59e7-4598-925c-8e230bce5db9', '2f522f5c-111c-4ce8-8bd0-d82e97c227ad', 'd2945137-b01d-4195-9f82-64d20f8ba657', '35f343df-3b87-4475-b0e4-d2ba5cc26eea', 'af1b83bb-3edc-4443-b771-67a1d235e82b', '41925f30-8737-4fb8-af65-da918c0e98f3', 'e665ce26-6ce9-4c42-8f6a-7a361a0ba328', 'd6450b43-baab-4406-8f77-d4c6abb803c1', '37316157-4e01-4ea8-b897-65a1a5a6bb30', '50a7ba7d-02fa-4ce6-9e09-f2194238bbe5', '47e7833f-f1a7-4703-942d-9acf12f39a1d', '709f5e96-51cd-49b4-a8e4-0ca0bf808de3', '2f87ff5c-dd38-4e2f-8a63-ace112b44002'],
    hiphop: [],
    folk: [],
    country: [],
    indie: [],
}

const backgrounds = {
    rock: "url('img/background_rock.svg')",
    electronic: "url('img/background_electronic.svg')",
    pop: "url('img/background_pop.svg')",
    latin: "url('img/background_latin.svg')",
    hiphop: "url('img/background_hiphop.svg')",
    folk: "url('img/background_folk.svg')",
    country: "url('img/background_country.svg')",
    indie: "url('img/background_indie.svg')",
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
const buttons_container = document.getElementById('buttons_container');
const genreTitle = document.getElementById('genre-title');
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        genreTitle.textContent = button.textContent;
        buttons_container.classList.add('hidden');
        const artists = [];
        const genre = button.getAttribute('id');

        document.body.style.backgroundImage = backgrounds[genre];
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        const ids = genres[genre];
        for (const id of ids) {
            const artist_data = await loadArtistDetailsById(id);
            const artist_top_song = await loadArtistTopSongById(id);
            if (!artist_data || !artist_top_song ||   !artist_top_song.track || !artist_data.artists || !artist_top_song.track.length ||!artist_data.artists.length) {
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

// -> create back button
const backButton = document.createElement('button');
backButton.textContent = 'Aura';
backButton.classList.add('back-button');

// -> back button click
backButton.addEventListener('click', () => {
    container.innerHTML = '';
    buttons_container.classList.remove('hidden');
    genreTitle.textContent = '';
    document.body.style.backgroundImage = '';
});

function displayArtists(artists) {
    container.innerHTML = '';
    // -> show back button
    container.appendChild(backButton);
    artists.forEach(details => {
        const artist = details.artist;
        const track = details.top_song;
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

        // -> create artist name
        const artistElement = document.createElement('h2');
        artistElement.textContent = track.strArtist;

        // -> create headline
        const headlineElement = document.createElement('h3');
        headlineElement.textContent = 'Top Track';  

        // -> create title
        const titleElement = document.createElement('p');
        titleElement.textContent = `${track.strTrack} | ${track.strAlbum}`;

        // -> fill card
        card.appendChild(mediaElement);
        card.appendChild(artistElement);
        card.appendChild(headlineElement);
        card.appendChild(titleElement);

        // -> add card to container
        container.appendChild(card);
    });
}