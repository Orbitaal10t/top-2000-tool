// Spotify Configuration
// Het is VEILIG om de Client ID hier te plaatsen - het is geen geheim!
// Spotify gebruikt PKCE voor authenticatie, wat veilig is zonder Client Secret.

const CONFIG = {
    // Vul hier je Spotify Client ID in
    // Haal deze op van: https://developer.spotify.com/dashboard
    //
    // BELANGRIJK: Hernoem dit bestand naar 'config.js' en vul je Client ID in!
    SPOTIFY_CLIENT_ID: 'jouw-client-id-hier',

    // Radio Stations Configuration
    RADIO_STATIONS: {
        'npo-radio-2': {
            name: 'NPO Radio 2',
            type: 'npo',
            apiUrl: 'https://www.nporadio2.nl/api/miniplayer/info?channel=npo-radio-2',
            liveUrl: 'https://www.nporadio2.nl/online-radio-luisteren/gedraaid'
        },
        'radio-538': {
            name: 'Radio 538',
            type: 'talpa',
            apiUrl: 'https://graph.talparad.io/',
            stationSlug: 'radio-538',
            apiKey: 'da2-abza7qpnqbfe5ihpk4jhcslpgy',
            liveUrl: 'https://www.538.nl/playlist'
        }
    },

    // Default station
    DEFAULT_STATION: 'npo-radio-2',

    // Spotify API endpoints
    SPOTIFY_AUTH_URL: 'https://accounts.spotify.com/authorize',
    SPOTIFY_TOKEN_URL: 'https://accounts.spotify.com/api/token',
    SPOTIFY_API_URL: 'https://api.spotify.com/v1',

    // App settings
    POLL_INTERVAL: 15000, // 15 seconds
    SPOTIFY_SCOPES: 'playlist-modify-public playlist-modify-private playlist-read-private'
};
