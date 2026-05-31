const genres = {
    rock: ['9c9f1380-2516-4fc9-a3e6-f9f61941d090','b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d','4753fcb7-9270-493a-974d-8daca4e49125', '23a03e33-a603-404e-bcbf-2c00159d7067','bd13909f-1c29-4c27-a874-d4aaf27c5b1a','8bfac288-ccc5-448d-9573-c33ea2aa5c30','012151a8-0f9a-44c9-997f-ebd68b5389f9','5b11f4ce-a62d-471e-81fc-a69a8278c7da','ada7a83c-e3e1-40f1-93f9-3e73dbc9298a','a6c6897a-7415-4f8d-b5a5-3a5e05f3be67','a74b1b7f-71a5-4011-9441-d0b5e4122711','0383dadf-2a4e-4d10-a46a-e9e041da8eb3','65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab','67f66c07-6e61-4026-ade5-7e782fad3a5d','f59c5520-5f46-4d2c-b2c4-822eabf53419','90744b3e-363a-458e-8da1-e3e392a489c4','3547f34a-db02-4ab7-b4a0-380e1ef951a9','5fee3020-513b-48c2-b1f7-4681b01db0c6','084308bd-1654-436f-ba03-df6697104e19','66c662b6-6e2f-4930-8610-912e24c63ed1'],
    electronic:['302bd7b9-d012-4360-897a-93b00c855680','8dd98bdc-80ec-4e93-8509-2f46bafc09a7','c85cfd6b-b1e9-4a50-bd55-eb725f04f7d5'],
    pop: ['20244d07-534f-4eff-b4d4-930878889970','7eb1ce54-a355-41f9-8d68-e018b096d427','f7441bc7-d7de-4813-a2fc-31a4033d396d', '6925db17-f35e-42f3-a4eb-84ee6bf5d4b0','e0140a67-e4d1-4f13-8a01-364355bee46e','afb680f2-b6eb-4cd7-a70b-a63b25c763d5', 'c8b03190-306c-4120-bb0b-6f2ebfc06ea9', '73e5e69d-3554-40d8-8516-00cb38737a1c', '650e7db6-b795-4eb5-a702-5ea2fc46c848', 'cc197bad-dc9c-440d-a5b5-d52ba2e14234', 'b8a7c51f-362c-4dcb-a259-bc6e0095f0a6', 'f4abc0b5-3f7a-4eff-8f78-ac078dbce533', 'f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387', '9fdaa16b-a6c4-4831-b87c-bc9ca8ce7eaa', '14f9d2e3-8c2e-4f3f-9d6b-1f5b551f6671', '06bdf6db-fd80-44dc-82d8-6ebffdd36cfe', 'b0c6e2df-5218-47f7-8580-98f9c3f5eeb5', 'b660c3d6-7a4d-4a2f-bc01-ea95f5d4d5df', 'de8aa3b0-3a7c-4bcb-8e20-8ddc8a5d9b21', '63e4834d-0d63-4b6c-bbbd-7d6eb05c8d9e', 'e8db18d9-5f7b-4a1b-b6c6-2f6ab0a1db13', 'f26f6f0d-2c1a-4e1d-bb3f-0f0d6a6c7d9f', '6d6f7d45-4f85-4d17-bf5d-1d0f4f6c2b7b', '7e9d8df1-5f8d-4d63-9d2a-7d3f2d8b4a66', '0d6c6d2d-0d2e-4d98-bf9f-1f2f3c6e4d8b', '525f1f1c-03f0-4bc8-8dfd-e7521f87631b', '5df62a88-cac9-490a-b62c-c7c88f4020f4', '80609a00-b394-4a49-975b-2db6b543fa97', '62b914a7-d775-4bb4-bb5e-d46e7df115b5', '749ef494-8518-4b49-b685-63d8e728d25c', 'fab34286-b8e1-4879-bce3-194e1358fbd2', '859d0860-d480-4efd-970c-c05d5f1776b8', 'f27ec8db-af05-4f36-916e-3d57f91ecf5e', 'e4bc69e2-a064-4f93-ada1-f7f209cc1cc3', 'b202beb7-99bd-47e7-8b72-195c8d72ebdd'],
    latin: ['5bdeb32d-56a5-4b6d-a768-264101fa0a0a','89aa5ecb-59ad-46f5-b3eb-2d424e941f19','de22adae-f8ac-414f-b653-b0162611bd60', 'bf24ca37-25f4-4e34-9aec-460b94364cfc','e8979f75-9110-4df8-ac70-898898d080d1','2f522f5c-111c-4ce8-8bd0-d82e97c227ad','35f866dc-c061-48ba-8157-cf2e0eac4857', 'c458e9dc-e0d5-45ea-9e83-f9d0395f030d', 'ed90e3b4-8eb8-4f9d-a24e-533c0c60c720', 'd1689304-23ac-4eae-a147-bd2e4100581a','151d9c35-43b8-49b9-a69a-5db6525dbcd2', 'ac367c2e-7783-41e5-a184-131da6b0c166', 'c2258df3-cfce-4dec-a721-33ca87c1be8f', '6a6eea03-b435-446c-bab1-312b45580aee', '30a57b7b-47c9-4234-86fd-9b8ff660e7cb', '664f5669-a550-49fc-a38c-951594ddc9a4', '04cff564-a2e3-4560-8e7e-bc2539e7b46c','f0602f55-1770-483d-89bd-4bae0d0ac086', 'd0c7656d-8169-4f77-9dbe-b8f24e40105d', 'd262ea27-3ffe-40f7-b922-85c42d625e67', '434e274b-78ae-4780-b7df-676e973985d0', 'becd8cc6-a453-4183-af88-dedaaec859a6', 'c3dcad1b-1380-4a94-98d8-3f8272f19df6', '5f2cb99a-7e59-429f-a44d-3a880edccfb1', '9ed27f22-e662-438e-952e-624d6abb5a01', '601f8530-9009-4f73-94fb-a355b4497b70', '9bacf78f-9132-43da-8873-8a9eb49da0e9',],
    hiphop: ['f82bcf78-5b69-4622-a5ef-73800768d9ac','98b5a1d4-3f58-412f-950c-ee9d82743705','d5d97b2b-b83b-4976-814a-056d9076c8c3', '9d7fbc7c-4d36-4b5d-9a1f-7c6b8d0f9e3a','381086ea-f511-4aba-bdf9-71c753dc5077','b95ce3ff-3d05-4e87-9e01-c97b66af13d4', '164f0d73-1234-4e2c-8743-d77bf2191051', 'ac9a487a-d9d2-4f27-bb23-0f4686488345', '5f6ab597-f57a-40da-be9e-adad48708203', 'f90e8b26-9e52-4669-a5c9-e28529c47894', '1d11e2a1-4531-4d61-a8c7-7b5c6a608fd2', '73fdb566-a9b1-494c-9f32-51768ec9fd27', '2792b097-0b1d-4c50-97f6-f7f097f86438', '1036b808-f58c-4a3e-b461-a2c4492ecf1b', '48262e82-db9f-4a92-b650-dfef979b73ec', 'f6beac20-5dfe-4d1f-ae02-0b0a740aafd6', '8e68819d-71be-4e7d-b41d-f1df81b01d3f', '25b7b584-d952-4662-a8b9-dd8cdfbfeb64','37b2cb82-ef79-4d46-a184-a549450aa231', 'b1e26560-60e5-4236-bbdb-9aa5a8d5ee19', 'a0e8a1b1-5f8f-475a-a253-17415c17d0ff', 'e0e1db18-f7ba-4dee-95ff-7ae8cf545460'],
    folk: ['72c536dc-7137-4477-a521-567eeb840fa8','c1e5344e-1bff-4727-9417-a4f55e41b5ff','99ea432a-e3d8-42cb-9d5e-db316a6a8458', 'd43d12a1-2dc9-4257-a2fd-0a3bb1081b86','aeee5fe5-38f5-41bc-8ab8-9f9aa23e4f68','34e10b51-b5c6-4bc1-b70e-f05f141eda1e', 'cb69e1f1-bc76-4df5-93c9-cf97dd8a3b5c', '05517043-ff78-4988-9c22-88c68588ebb9', '68c6926c-03e0-4afc-9f54-2190b2c8d468', '65314b12-0e08-43fa-ba33-baaa7b874c15', 'cc60d937-e80b-4c66-8aa2-e89cb57c8b08', '79c41645-d2bf-4f53-8f17-4be34099eaf3', '20244d07-534f-4eff-b4d4-930878889970', '1d543e07-d0d2-4834-a8db-d65c50c2a856', 'faabb55d-3c9e-4c23-8779-732ac2ee2c0d', '5dca4d22-d6c8-4e70-8ca1-4543e43353c7', '	3248ed2d-bada-41b5-a7b6-ac88faa1f1ac', '6cfd7ffc-824f-4219-8e27-4b9417700f44'],
    country: ['8ef1df30-ae4f-4dbd-9351-1a32b208a01e','9252ca18-015c-484c-ae59-5670784887d3','bc85da58-52d9-457d-ae8d-5d8d4ec870a9','494e8d09-f85b-4543-892f-a5096aed1cd4','3414d446-735a-443c-931f-10634f57e5b9','e520459c-dff4-491d-a6e4-c97be35e0044', '28737730-ec70-4da5-89c5-77ac13c5c34d', 	'a796b92e-c137-4895-9c89-10f900617a4f', '93998e01-ff53-4af7-ba2a-5674adcdf21e','1b8a634e-9fa2-4ddb-bdcf-50bc7e4b167c','285e1285-aecc-478f-a8da-0c8cf69e1217', '201412c6-7ced-472b-87a9-9259ec3c07d3', 'ad322b8b-31b2-437d-8fd8-1af13c1d7b91', '67930b3e-e00b-469f-8c74-fd69f20522ec','dfe9a7c4-8cf2-47f4-9dcb-d233c2b86ec3','d02dd67e-f655-4600-bc47-f789f59e7367'],
    indie: ['41afe80d-cf00-45e2-b0bb-4774faaadb51','7a3970c9-ecd8-4eee-a267-4d8c77d97ff3','ada7a83c-e3e1-40f1-93f9-3e73dbc9298a', '63aa26c3-d59b-4da4-84ac-716b54f1ef4d','f181961b-20f7-459e-89de-920ef03c7ed0','96855c21-b832-4366-ba12-0d2330c36a86', 'afb680f2-b6eb-4cd7-a70b-a63b25c763d5', '0b51c468-8573-4a79-82ea-34cda32f6cfa', 'fa97c8d5-dc29-4d0f-a56c-5a12c971d8f4', '81a9d95c-8001-43f6-b745-c3792f88d4b7', 'cfc7d6f6-7a3f-4f6b-bf13-8b7f4d1a2c53', '8ef1df52-7c3b-4f94-9d61-2e2d4d3b1a8a', 'f2492c31-54a8-4347-a1fc-f81f72873bbf', 'd786f59b-1836-4ddb-8393-ab753edbe984', 'fa58cf24-0e44-421d-8519-8bf461dcfaa5', '5b6ebfe0-f72b-4902-bba9-74c8af0f1af0', '34557d8f-ee4a-44ab-ae6e-49bb8ac604d0', 'c5e1f6e4-bf71-4d5f-942d-63b395f4f4f9', '6ca18a66-21b6-4e31-b6b0-4a9e8e5b1f8f', 'd51df6ec-3e3e-4a0c-b17b-6c1f5d76d9c4', '40f5d9e4-2de7-4f2d-ad41-e31a9a9fea27', '484a4e90-6899-4e4b-a948-a2255d365340', 'd5cc67b8-1cc4-453b-96e8-44487acdebea', 'e5c7b94f-e264-473c-bb0f-37c85d4d5c70', '0039c7ae-e1a7-4a7d-9b49-0cbc716821a6', 'b7539c32-53e7-4908-bda3-81449c367da6','ae7f8d4b-9ce8-4014-bc32-0720044616b9', '97b8d224-5660-419c-8dff-4b3bf0c33983', 'e1194e66-e4f0-4351-9d26-ac95df530d0c', '52074ba6-e495-4ef3-9bb4-0703888a9f68', 'fc7bbf00-fbaa-4736-986b-b3ac0266ca9b', 'd786f59b-1836-4ddb-8393-ab753edbe984', '1cb7bd1c-3bb0-408c-b441-1f83802f00b1', '3e55d51d-687f-4a9d-af96-2fabccf802e5', '4ae429fe-735c-4968-8253-a591421b1bd0', '25ab7547-a4d2-480b-b028-c7f3497bc858'],
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

const backLogo = {
    rock: "url('img/button_rock.svg')",
    electronic: "url('img/button_electronic.svg')",
    pop: "url('img/button_pop.svg')",
    latin: "url('img/button_latin.svg')",
    hiphop: "url('img/button_hiphop.svg')",
    folk: "url('img/button_folk.svg')",
    country: "url('img/button_country.svg')",
    indie: "url('img/button_indie.svg')",
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
const hero = document.getElementById('hero');
buttons.forEach(button => {
    button.addEventListener('click', async () => {
        hero.classList.add('hidden');
        genreTitle.textContent = button.textContent;
        buttons_container.classList.add('hidden');
        const artists = [];
        const genre = button.getAttribute('id');

        document.body.style.backgroundImage = backgrounds[genre];
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        backButton.style.backgroundImage = backLogo[genre];
        backButton.style.backgroundSize = 'cover';
        backButton.style.backgroundPosition = 'center';
        backButton.style.backgroundRepeat = 'no-repeat';

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
    hero.classList.remove('hidden');
    document.body.style.backgroundImage = '';
    backButton.style.backgroundImage = '';
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