<?php

declare(strict_types=1);

ini_set('display_errors', '0');
error_reporting(E_ALL);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

set_error_handler(static function (int $severity, string $message, string $file, int $line): bool {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(static function (Throwable $exception): void {
    jsonResponse([
        'error' => 'Internal server error',
        'message' => $exception->getMessage(),
    ], 500);
});

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($requestMethod === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($requestMethod !== 'GET') {
    jsonResponse([
        'error' => 'Method not allowed. Use GET.',
    ], 405);
}

if (!function_exists('curl_init')) {
    jsonResponse([
        'error' => 'The PHP cURL extension is required.',
    ], 500);
}

$env = loadEnv(__DIR__ . '/.env');
$clientId = $env['SPOTIFY_CLIENT_ID'] ?? null;
$clientSecret = $env['SPOTIFY_CLIENT_SECRET'] ?? null;

if (!$clientId || !$clientSecret) {
    jsonResponse([
        'error' => 'Missing Spotify credentials in .env',
    ], 500);
}

$action = trim((string) ($_GET['action'] ?? ''));

if ($action === '') {
    jsonResponse([
        'error' => 'Missing action parameter',
        'supported_actions' => supportedActions(),
    ], 400);
}

if ($action === 'concerts') {
    jsonResponse([
        'action' => 'concerts',
        'error' => 'Spotify Web API does not provide a concerts endpoint.',
        'available' => false,
        'date_checked' => gmdate('Y-m-d'),
        'suggestion' => 'Use Spotify for music metadata and a separate events API for concerts.',
    ], 501);
}

$accessToken = getAccessToken($clientId, $clientSecret, __DIR__ . '/spotify-token-cache.json');

switch ($action) {
    case 'genres':
        jsonResponse(fetchGenres($accessToken, __DIR__, getBoolParam('refresh', false)), 200);

    case 'search_artists':
        $query = requireStringParam('q');
        $limit = getIntParam('limit', 10, 1, 50);
        $offset = getIntParam('offset', 0, 0, 1000);

        $response = spotifyApiGet('/search', $accessToken, [
            'q' => $query,
            'type' => 'artist',
            'limit' => $limit,
            'offset' => $offset,
        ]);
        ensureSpotifySuccess($response, 'Could not search artists');

        jsonResponse([
            'action' => $action,
            'query' => $query,
            'items' => $response['json']['artists']['items'] ?? [],
            'total' => $response['json']['artists']['total'] ?? 0,
            'limit' => $response['json']['artists']['limit'] ?? $limit,
            'offset' => $response['json']['artists']['offset'] ?? $offset,
        ], 200);

    case 'artist':
        $id = requireStringParam('id');
        $response = spotifyApiGet('/artists/' . rawurlencode($id), $accessToken);
        ensureSpotifySuccess($response, 'Could not fetch artist');

        jsonResponse([
            'action' => $action,
            'item' => $response['json'],
        ], 200);

    case 'artist_albums':
        $id = requireStringParam('id');
        $limit = getIntParam('limit', 20, 1, 50);
        $offset = getIntParam('offset', 0, 0, 1000);
        $market = getOptionalStringParam('market');
        $includeGroups = getOptionalStringParam('include_groups');

        $query = [
            'limit' => $limit,
            'offset' => $offset,
        ];

        if ($market !== null) {
            $query['market'] = strtoupper($market);
        }

        if ($includeGroups !== null) {
            $query['include_groups'] = $includeGroups;
        }

        $response = spotifyApiGet('/artists/' . rawurlencode($id) . '/albums', $accessToken, $query);
        ensureSpotifySuccess($response, 'Could not fetch artist albums');

        jsonResponse([
            'action' => $action,
            'artist_id' => $id,
            'items' => $response['json']['items'] ?? [],
            'total' => $response['json']['total'] ?? 0,
            'limit' => $response['json']['limit'] ?? $limit,
            'offset' => $response['json']['offset'] ?? $offset,
        ], 200);

    case 'artist_top_tracks':
        $id = requireStringParam('id');
        $market = strtoupper(getStringParam('market', 'CH'));

        $response = spotifyApiGet('/artists/' . rawurlencode($id) . '/top-tracks', $accessToken, [
            'market' => $market,
        ]);
        ensureSpotifySuccess($response, 'Could not fetch artist top tracks', [
            'deprecated' => true,
        ]);

        jsonResponse([
            'action' => $action,
            'artist_id' => $id,
            'market' => $market,
            'deprecated' => true,
            'items' => $response['json']['tracks'] ?? [],
        ], 200);

    case 'search_albums':
        $query = requireStringParam('q');
        $limit = getIntParam('limit', 10, 1, 50);
        $offset = getIntParam('offset', 0, 0, 1000);
        $market = getOptionalStringParam('market');

        $params = [
            'q' => $query,
            'type' => 'album',
            'limit' => $limit,
            'offset' => $offset,
        ];

        if ($market !== null) {
            $params['market'] = strtoupper($market);
        }

        $response = spotifyApiGet('/search', $accessToken, $params);
        ensureSpotifySuccess($response, 'Could not search albums');

        jsonResponse([
            'action' => $action,
            'query' => $query,
            'items' => $response['json']['albums']['items'] ?? [],
            'total' => $response['json']['albums']['total'] ?? 0,
            'limit' => $response['json']['albums']['limit'] ?? $limit,
            'offset' => $response['json']['albums']['offset'] ?? $offset,
        ], 200);

    case 'album':
        $id = requireStringParam('id');
        $market = getOptionalStringParam('market');
        $query = [];

        if ($market !== null) {
            $query['market'] = strtoupper($market);
        }

        $response = spotifyApiGet('/albums/' . rawurlencode($id), $accessToken, $query);
        ensureSpotifySuccess($response, 'Could not fetch album');

        jsonResponse([
            'action' => $action,
            'item' => $response['json'],
        ], 200);

    case 'album_tracks':
        $id = requireStringParam('id');
        $limit = getIntParam('limit', 20, 1, 50);
        $offset = getIntParam('offset', 0, 0, 1000);
        $market = getOptionalStringParam('market');

        $query = [
            'limit' => $limit,
            'offset' => $offset,
        ];

        if ($market !== null) {
            $query['market'] = strtoupper($market);
        }

        $response = spotifyApiGet('/albums/' . rawurlencode($id) . '/tracks', $accessToken, $query);
        ensureSpotifySuccess($response, 'Could not fetch album tracks');

        jsonResponse([
            'action' => $action,
            'album_id' => $id,
            'items' => $response['json']['items'] ?? [],
            'total' => $response['json']['total'] ?? 0,
            'limit' => $response['json']['limit'] ?? $limit,
            'offset' => $response['json']['offset'] ?? $offset,
        ], 200);

    case 'search_tracks':
        $query = requireStringParam('q');
        $limit = getIntParam('limit', 10, 1, 50);
        $offset = getIntParam('offset', 0, 0, 1000);
        $market = getOptionalStringParam('market');

        $params = [
            'q' => $query,
            'type' => 'track',
            'limit' => $limit,
            'offset' => $offset,
        ];

        if ($market !== null) {
            $params['market'] = strtoupper($market);
        }

        $response = spotifyApiGet('/search', $accessToken, $params);
        ensureSpotifySuccess($response, 'Could not search tracks');

        jsonResponse([
            'action' => $action,
            'query' => $query,
            'items' => $response['json']['tracks']['items'] ?? [],
            'total' => $response['json']['tracks']['total'] ?? 0,
            'limit' => $response['json']['tracks']['limit'] ?? $limit,
            'offset' => $response['json']['tracks']['offset'] ?? $offset,
        ], 200);

    case 'track':
        $id = requireStringParam('id');
        $market = getOptionalStringParam('market');
        $query = [];

        if ($market !== null) {
            $query['market'] = strtoupper($market);
        }

        $response = spotifyApiGet('/tracks/' . rawurlencode($id), $accessToken, $query);
        ensureSpotifySuccess($response, 'Could not fetch track');

        jsonResponse([
            'action' => $action,
            'item' => $response['json'],
        ], 200);

    default:
        jsonResponse([
            'error' => 'Unknown action',
            'action' => $action,
            'supported_actions' => supportedActions(),
        ], 400);
}

function supportedActions(): array
{
    return [
        'genres',
        'search_artists',
        'artist',
        'artist_albums',
        'artist_top_tracks',
        'search_albums',
        'album',
        'album_tracks',
        'search_tracks',
        'track',
        'concerts',
    ];
}

function fetchGenres(string $accessToken, string $baseDir, bool $forceRefresh): array
{
    $cachePath = $baseDir . '/spotify-genres-cache.json';

    if (!$forceRefresh) {
        $cachedPayload = readJsonCache($cachePath, 86400);

        if ($cachedPayload !== null) {
            return $cachedPayload;
        }
    }

    $seedResponse = spotifyApiGet('/recommendations/available-genre-seeds', $accessToken);
    $seedGenres = $seedResponse['json']['genres'] ?? null;

    if ($seedResponse['status'] >= 200 && $seedResponse['status'] < 300 && is_array($seedGenres)) {
        sort($seedGenres);

        $payload = [
            'action' => 'genres',
            'genres' => array_values($seedGenres),
            'count' => count($seedGenres),
            'source' => 'spotify_recommendation_seeds',
            'complete' => true,
            'fetched_at' => gmdate(DATE_ATOM),
        ];

        writeJsonCache($cachePath, $payload);

        return $payload;
    }

    $fallbackGenres = collectGenresFromArtistSearch($accessToken);

    if ($fallbackGenres === []) {
        jsonResponse([
            'error' => 'Could not fetch genres from Spotify',
            'spotify_status' => $seedResponse['status'],
            'curl_error' => $seedResponse['curl_error'],
            'spotify_response' => $seedResponse['json'] ?? $seedResponse['body'],
        ], 502);
    }

    $payload = [
        'action' => 'genres',
        'genres' => $fallbackGenres,
        'count' => count($fallbackGenres),
        'source' => 'spotify_artist_search_fallback',
        'complete' => false,
        'warning' => 'Spotify genre seeds currently returned ' . $seedResponse['status'] . ' on ' . gmdate('Y-m-d') . '. This list is derived from artist genres returned by Spotify Search and is not guaranteed to be complete.',
        'fetched_at' => gmdate(DATE_ATOM),
    ];

    writeJsonCache($cachePath, $payload);

    return $payload;
}

function getAccessToken(string $clientId, string $clientSecret, string $cachePath): string
{
    $cachedToken = readJsonCache($cachePath, 3300);

    if (is_array($cachedToken) && isset($cachedToken['access_token']) && is_string($cachedToken['access_token'])) {
        return $cachedToken['access_token'];
    }

    $response = request(
        'https://accounts.spotify.com/api/token',
        'POST',
        http_build_query(['grant_type' => 'client_credentials']),
        [
            'Authorization: Basic ' . base64_encode($clientId . ':' . $clientSecret),
            'Content-Type: application/x-www-form-urlencoded',
        ]
    );

    if ($response['status'] < 200 || $response['status'] >= 300) {
        jsonResponse([
            'error' => 'Could not get Spotify access token',
            'spotify_status' => $response['status'],
            'curl_error' => $response['curl_error'],
            'spotify_response' => $response['json'] ?? $response['body'],
        ], 502);
    }

    $accessToken = $response['json']['access_token'] ?? null;

    if (!is_string($accessToken) || $accessToken === '') {
        jsonResponse([
            'error' => 'Spotify token response did not contain an access token',
        ], 502);
    }

    writeJsonCache($cachePath, [
        'access_token' => $accessToken,
        'cached_at' => gmdate(DATE_ATOM),
    ]);

    return $accessToken;
}

function spotifyApiGet(string $path, string $accessToken, array $query = []): array
{
    $url = 'https://api.spotify.com/v1' . $path;

    if ($query !== []) {
        $url .= '?' . http_build_query($query);
    }

    return request($url, 'GET', null, [
        'Authorization: Bearer ' . $accessToken,
    ]);
}

function request(string $url, string $method, ?string $body, array $headers = []): array
{
    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 20,
    ]);

    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    }

    $responseBody = curl_exec($ch);
    $statusCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $curlError = curl_error($ch);

    if ($responseBody === false) {
        return [
            'status' => 0,
            'body' => null,
            'json' => null,
            'curl_error' => $curlError !== '' ? $curlError : null,
        ];
    }

    $json = json_decode($responseBody, true);

    return [
        'status' => $statusCode,
        'body' => $responseBody,
        'json' => is_array($json) ? $json : null,
        'curl_error' => $curlError !== '' ? $curlError : null,
    ];
}

function ensureSpotifySuccess(array $response, string $message, array $extra = []): void
{
    if ($response['status'] >= 200 && $response['status'] < 300) {
        return;
    }

    jsonResponse(array_merge([
        'error' => $message,
        'spotify_status' => $response['status'],
        'curl_error' => $response['curl_error'],
        'spotify_response' => $response['json'] ?? $response['body'],
    ], $extra), 502);
}

function collectGenresFromArtistSearch(string $accessToken): array
{
    $queries = array_merge(range('a', 'z'), ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    $genres = [];

    foreach ($queries as $query) {
        $response = spotifyApiGet('/search', $accessToken, [
            'q' => $query,
            'type' => 'artist',
            'limit' => 10,
        ]);

        if ($response['status'] < 200 || $response['status'] >= 300) {
            continue;
        }

        $items = $response['json']['artists']['items'] ?? [];

        if (!is_array($items)) {
            continue;
        }

        foreach ($items as $artist) {
            $artistGenres = $artist['genres'] ?? [];

            if (!is_array($artistGenres)) {
                continue;
            }

            foreach ($artistGenres as $genre) {
                if (!is_string($genre) || $genre === '') {
                    continue;
                }

                $genres[$genre] = true;
            }
        }
    }

    $genreList = array_keys($genres);
    sort($genreList);

    return $genreList;
}

function loadEnv(string $path): array
{
    if (!is_file($path)) {
        return [];
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    if ($lines === false) {
        return [];
    }

    $env = [];

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        $parts = explode('=', $line, 2);

        if (count($parts) !== 2) {
            continue;
        }

        $key = trim($parts[0]);
        $value = trim($parts[1]);

        $env[$key] = trim($value, "\"'");
    }

    return $env;
}

function readJsonCache(string $path, int $ttlSeconds): ?array
{
    if (!is_file($path)) {
        return null;
    }

    $modifiedAt = filemtime($path);

    if ($modifiedAt === false) {
        return null;
    }

    if ((time() - $modifiedAt) > $ttlSeconds) {
        return null;
    }

    $contents = file_get_contents($path);

    if (!is_string($contents)) {
        return null;
    }

    $json = json_decode($contents, true);

    return is_array($json) ? $json : null;
}

function writeJsonCache(string $path, array $payload): void
{
    file_put_contents($path, json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function requireStringParam(string $name): string
{
    $value = getOptionalStringParam($name);

    if ($value === null) {
        jsonResponse([
            'error' => 'Missing required parameter',
            'parameter' => $name,
        ], 400);
    }

    return $value;
}

function getOptionalStringParam(string $name): ?string
{
    if (!isset($_GET[$name])) {
        return null;
    }

    $value = trim((string) $_GET[$name]);

    return $value === '' ? null : $value;
}

function getStringParam(string $name, string $default): string
{
    $value = getOptionalStringParam($name);

    return $value ?? $default;
}

function getIntParam(string $name, int $default, int $min, int $max): int
{
    if (!isset($_GET[$name]) || $_GET[$name] === '') {
        return $default;
    }

    $value = filter_var($_GET[$name], FILTER_VALIDATE_INT);

    if ($value === false) {
        jsonResponse([
            'error' => 'Parameter must be an integer',
            'parameter' => $name,
        ], 400);
    }

    return max($min, min($max, (int) $value));
}

function getBoolParam(string $name, bool $default): bool
{
    if (!isset($_GET[$name])) {
        return $default;
    }

    $value = strtolower(trim((string) $_GET[$name]));

    return in_array($value, ['1', 'true', 'yes', 'on'], true);
}

function jsonResponse(array $payload, int $statusCode): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}
