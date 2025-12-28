# NPO Radio 2 - Now Playing Tracker

Single-page app om NPO Radio 2 tracks toe te voegen aan een Spotify playlist.

## Features

- Live now playing data van NPO Radio 2
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
- Spotify Web API: search, playlists

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
