<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

// 1. Deine Genre-zu-IDs-Liste laden (definiert $genres)
$genres = [];
require __DIR__ . '/genres.php';

// 2. Credentials aus der .env lesen
//    WICHTIG: Passe die Namen rechts an die an, die in DEINER .env stehen!
$env = parse_ini_file(__DIR__ . '/.env');
$clientId     = $env['SPOTIFY_CLIENT_ID']     ?? '';
$clientSecret = $env['SPOTIFY_CLIENT_SECRET'] ?? '';

if ($clientId === '' || $clientSecret === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Credentials fehlen in .env']);
    exit;
}

// 3. Access-Token holen (Client Credentials, kein Login nötig)
$tokenRaw = file_get_contents('https://accounts.spotify.com/api/token', false,
    stream_context_create(['http' => [
        'method'  => 'POST',
        'header'  => "Content-Type: application/x-www-form-urlencoded\r\n"
                   . 'Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret) . "\r\n",
        'content' => http_build_query(['grant_type' => 'client_credentials']),
        'ignore_errors' => true,
    ]]));
$token = json_decode($tokenRaw, true)['access_token'] ?? null;

if (!$token) {
    http_response_code(502);
    echo json_encode(['error' => 'Kein Spotify-Token', 'detail' => $tokenRaw]);
    exit;
}

// 4. Optional nach Genre filtern: get-several-artists.php?genre=pop
$wanted   = $_GET['genre'] ?? null;
$selected = ($wanted && isset($genres[$wanted]))
    ? [$wanted => $genres[$wanted]]
    : $genres;

// 5. Pro Genre die Artists in 50er-Blöcken holen
$result = [];
foreach ($selected as $genreName => $ids) {
    $artists = [];
    foreach (array_chunk($ids, 50) as $chunk) {
        $url  = 'https://api.spotify.com/v1/artists?ids=' . implode(',', $chunk);
        $raw  = file_get_contents($url, false, stream_context_create(['http' => [
            'method' => 'GET',
            'header' => 'Authorization: Bearer ' . $token . "\r\n",
            'ignore_errors' => true,
        ]]));
        $data = json_decode($raw, true);
        foreach ($data['artists'] ?? [] as $a) {
            if ($a === null) { continue; }
            $artists[] = [
                'id'         => $a['id'],
                'name'       => $a['name'],
                'genre'      => $genreName,                    // deine Zuordnung
                'popularity' => $a['popularity'] ?? null,
                'image'      => $a['images'][0]['url'] ?? null,
                'spotify'    => $a['external_urls']['spotify'] ?? null,
            ];
        }
    }
    $result[$genreName] = $artists;
}

echo json_encode(['action' => 'several_artists', 'genres' => $result],
    JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);