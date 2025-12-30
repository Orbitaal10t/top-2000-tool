# Radio Tracker - Multi-Station Now Playing Tool

Single-page app om tracks van verschillende radiostations toe te voegen aan een Spotify playlist.

## Features

- Multi-station support (NPO Radio 2, Radio 538, en meer)
- Live now playing data met album covers
- Chart posities weergave
- Spotify OAuth integratie (PKCE flow)
- Automatische token refresh
- PWA support

Check het live via https://htools.nl/top-2000-tool/
## Setup

### Spotify Developer App

1. Maak een app aan op [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Configureer redirect URI: `https://your-domain.com/index.html`
3. Kopieer de Client ID

### Configuratie

Twee opties:

**Optie A: config.js (aanbevolen)**

```bash
cp config.example.js config.js
```

Pas `SPOTIFY_CLIENT_ID` aan in `config.js`. De Client ID mag gewoon in de repository staan - PKCE vereist geen secret.

**Optie B: Runtime configuratie**

De app toont een setup wizard als `config.js` ontbreekt. Client ID wordt dan opgeslagen in localStorage.

### Local development

OAuth vereist een webserver (geen `file://`):

```bash
python -m http.server 8000
# of
npx http-server -p 8000
```

### Hosting

GitHub Pages, Netlify, Vercel, of je eigen server. Update de redirect URI in je Spotify app config.

## Tech stack

- Vanilla JavaScript (geen frameworks)
- Spotify Web API (OAuth 2.0 PKCE flow)
- NPO Radio 2 miniplayer API
- LocalStorage voor tokens en state

### Spotify scopes

```
playlist-modify-public
playlist-modify-private
playlist-read-private
```

### APIs gebruikt

- NPO Radio 2: `https://www.nporadio2.nl/api/miniplayer/info?channel=npo-radio-2`
- Talpa Radio (Radio 538): `https://graph.talparad.io/` (GraphQL)
- Spotify Web API: search, playlists

## Nieuwe radiostations toevoegen

De app ondersteunt meerdere radiostations. Nieuwe stations kunnen eenvoudig worden toegevoegd in `config.js`.

### Voorbeeld: Radio 538 toevoegen

In `config.js`, voeg het station toe aan het `RADIO_STATIONS` object:

```javascript
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
}
```

### Ondersteunde station types

**NPO type** (`type: 'npo'`)
- Voor NPO radiostations (Radio 2, 3FM, etc.)
- Vereist: `apiUrl`, `liveUrl`

**Talpa type** (`type: 'talpa'`)
- Voor Talpa Radio stations (Radio 538, Radio 10, etc.)
- Vereist: `apiUrl`, `stationSlug`, `apiKey`, `liveUrl`

### Nieuwe station types toevoegen

Voor stations met een andere API:

1. Voeg het nieuwe type toe aan `config.js`
2. Implementeer een nieuwe fetch functie in `index.html` (bijvoorbeeld `fetchYourStationNowPlaying()`)
3. Voeg de type check toe in de `fetchNowPlaying()` functie

Voorbeeld structuur:

```javascript
async function fetchYourStationNowPlaying(station) {
    // Haal data op van de API
    const response = await fetch(station.apiUrl);
    const data = await response.json();

    // Parse de data en set currentTrack
    currentTrack = {
        artist: data.artist,
        title: data.title,
        coverUrl: data.cover,
        presenters: [],
        timestamp: new Date().toISOString(),
        chartPosition: null,
        lastChartPosition: null,
        chartTitle: null
    };

    displayNowPlaying(currentTrack);
}
```

## Troubleshooting

**Redirect URI mismatch**
- URI in Spotify app moet exact matchen met je hosted URL
- Let op trailing slashes en `/index.html`

**Invalid client**
- Check Client ID voor spaties
- Client Secret is niet nodig (PKCE flow)

## License

MIT

## Deployment (optioneel)

De repo bevat een GitHub Actions workflow voor SSH deployment via rsync.

### Required secrets

Settings → Secrets and variables → Actions:

| Secret | Beschrijving |
|--------|--------------|
| `SSH_PRIVATE_KEY` | Private key voor SSH auth |
| `SSH_HOST` | Server hostname |
| `SSH_USERNAME` | SSH user |
| `SSH_PORT` | SSH port (default: 22) |
| `DEPLOY_PATH` | Absoluut pad op server |

Deploy wordt getriggerd bij push naar `main`. Rsync exclude: `.git`, `.github`, `config.js`.
