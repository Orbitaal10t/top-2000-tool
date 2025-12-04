# NPO Radio 2 - Now Playing Tracker

Een single-page HTML applicatie om nummers van NPO Radio 2 te tracken en op te slaan voor de Top 2000 stemming.

## ✨ Features

- 🎵 **Live Now Playing**: Zie welk nummer er nu op NPO Radio 2 wordt afgespeeld
- 📝 **Stemlijst**: Voeg nummers toe aan je persoonlijke lijst
- 🎧 **Spotify Integratie**: Automatisch toevoegen aan je Spotify liked songs (aanbevolen)
- 💾 **Lokale Opslag**: Of gebruik localStorage als fallback
- 🔄 **Auto-refresh**: Tokens worden automatisch vernieuwd - blijf permanent ingelogd
- 📱 **Responsive**: Werkt op mobiel en desktop
- 🚫 **Dubbele Preventie**: Voorkomt dat je nummers dubbel toevoegt

## 🚀 Snelstart

### Optie 1: Lokaal gebruik (simpel, maar beperkt)

1. Open `index.html` in je browser
2. Kies "Lokaal" als opslagmethode
3. Klaar! Voeg nummers toe terwijl je luistert

**Let op**: Lokale opslag is alleen beschikbaar op dit apparaat en deze browser.

### Optie 2: Met Spotify (aanbevolen)

Voor de beste ervaring met sync tussen apparaten en privacy:

## 📋 Spotify Developer Setup (Eenmalig)

### Stap 1: Maak een Spotify Developer App

1. Ga naar [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in met je Spotify account (gratis account is voldoende)
3. Klik op **"Create app"**
4. Vul in:
   - **App name**: `NPO Radio 2 Tracker` (of een eigen naam)
   - **App description**: `Personal app to track NPO Radio 2 songs`
   - **Redirect URI**: Voeg deze toe (zie stap 2)
   - **APIs used**: Selecteer **"Web API"**
5. Accepteer de terms en klik op **"Save"**

### Stap 2: Configureer de Redirect URI

De redirect URI is de URL waar je de app host. Dit kan zijn:

#### Voor lokaal testen:
```
http://localhost:8000/index.html
```

#### Voor GitHub Pages:
```
https://jouwgebruikersnaam.github.io/jouwrepository/index.html
```

#### Voor eigen domein:
```
https://jouwdomein.nl/index.html
```

**Belangrijk**:
- Voeg de **exacte** URL toe inclusief het pad naar index.html
- De applicatie toont de juiste redirect URI bovenaan de configuratie sectie
- Je kunt meerdere redirect URIs toevoegen voor verschillende omgevingen

### Stap 3: Kopieer je Client ID

1. In je Spotify app dashboard, klik op **"Settings"**
2. Kopieer de **Client ID** (lange string met letters en cijfers)
3. **Let op**: Je hebt GEEN Client Secret nodig! (We gebruiken PKCE)

### Stap 4: Configureer de applicatie

1. Open `index.html` in je browser
2. Kies **"Spotify (Aanbevolen)"** als opslagmethode
3. Plak je **Client ID** in het invoerveld
4. Klik op **"Opslaan en verbinden met Spotify"**
5. Je wordt doorgestuurd naar Spotify om in te loggen
6. Keur de app goed (eenmalig)
7. Klaar! Je bent nu verbonden en blijft ingelogd

## 🌐 De Applicatie Hosten

De applicatie moet gehost worden (niet als `file://`) om de Spotify OAuth te laten werken.

### Optie A: Lokale Webserver (Voor testen)

#### Python 3:
```bash
python -m http.server 8000
```

#### Python 2:
```bash
python -m SimpleHTTPServer 8000
```

#### Node.js (met npx):
```bash
npx http-server -p 8000
```

Ga dan naar: `http://localhost:8000/index.html`

### Optie B: GitHub Pages (Gratis hosting)

1. Push de repository naar GitHub
2. Ga naar repository **Settings** > **Pages**
3. Kies branch **main** en folder **/** (root)
4. Klik op **Save**
5. Je app is nu live op: `https://jouwgebruikersnaam.github.io/jouwrepository/index.html`

**Vergeet niet**: Voeg de GitHub Pages URL toe aan je Spotify app redirect URIs!

### Optie C: Andere Hosting

Je kunt ook gebruiken:
- Netlify (sleep index.html in hun dashboard)
- Vercel
- Firebase Hosting
- Je eigen webserver

## 💡 Gebruik

### Eerste keer:

1. Open de applicatie
2. Kies je opslagmethode (Spotify aanbevolen)
3. Configureer Spotify (indien gekozen)
4. Log in bij Spotify

### Daarna:

1. Open de applicatie - je bent automatisch ingelogd! 🎉
2. Zie welk nummer er nu speelt
3. Klik op **"Voeg toe aan mijn stemlijst"**
4. Herhaal voor elk nummer dat je leuk vindt
5. Je lijst wordt automatisch opgeslagen

### Token Vernieuwing (Automatisch)

- Je **access token** verloopt na 1 uur
- De app vernieuwt dit **automatisch** met je refresh token
- Je blijft **permanent ingelogd** totdat je uitlogt
- Je merkt niets van de token vernieuwing!

### Uitloggen

Klik op de **"Uitloggen"** knop rechtsboven om je Spotify verbinding te verbreken.

## 🔒 Privacy & Veiligheid

### Spotify (Aanbevolen):
- ✅ Privé: alleen jij ziet je lijst
- ✅ Veilig: tokens worden lokaal opgeslagen
- ✅ Sync: werkt op al je apparaten
- ✅ Permanent: nummers blijven in je Spotify account

### Lokale Opslag:
- ⚠️ **Niet privé**: iedereen die je browser gebruikt ziet je lijst
- ⚠️ Verdwijnt bij cache wissen
- ⚠️ Alleen op dit apparaat

## 🔧 Technische Details

### Stack:
- Pure HTML, CSS, JavaScript (geen frameworks)
- Spotify Web API met OAuth 2.0
- Authorization Code Flow with PKCE
- LocalStorage voor persistente opslag

### API's:
- **NPO Radio 2 API**: `https://www.nporadio2.nl/api/tracks/now`
- **Spotify Web API**: Search, Add to Liked Songs, Token Refresh

### Spotify Scopes:
- `playlist-modify-public`: Voeg nummers toe aan publieke playlists
- `playlist-modify-private`: Voeg nummers toe aan private playlists
- `playlist-read-private`: Lees je playlists
- `user-library-read`: Lees je liked songs

## 🐛 Troubleshooting

### "Redirect URI mismatch" fout

- Controleer of de redirect URI in je Spotify app **exact** overeenkomt met de URL waar je de app host
- Let op hoofdletters, slashes, en het pad
- Voorbeeld: `http://localhost:8000/index.html` ≠ `http://localhost:8000/`

### "Invalid client" fout

- Controleer of je Client ID correct is gekopieerd
- Geen spaties voor of na de Client ID
- Client Secret is NIET nodig

### Nummer niet gevonden op Spotify

- Niet alle NPO Radio 2 nummers zijn beschikbaar op Spotify
- De app slaat het nummer dan lokaal op als fallback
- Je ziet een waarschuwing: "Nummer niet gevonden op Spotify"

### Token verloopt direct

- Dit zou niet moeten gebeuren met automatische refresh
- Check of je refresh token correct is opgeslagen
- Log opnieuw in via "Uitloggen" en daarna opnieuw verbinden

### Nummers verdwijnen

**Lokale opslag:**
- Verdwijnt bij browsercache wissen
- Verdwijnt bij site-data verwijderen
- Gebruik Spotify voor permanente opslag

**Spotify:**
- Nummers blijven permanent in je Spotify account
- Synchroniseert tussen alle apparaten

## 📝 Licentie

Dit is een persoonlijk project voor educatieve doeleinden. Vrij te gebruiken en aan te passen.

## 🙏 Credits

- NPO Radio 2 voor de API
- Spotify voor de Web API
- Gebouwd met ❤️ voor muziekliefhebbers

## 🚀 Automatische Deployment

Deze repository is geconfigureerd met GitHub Actions voor automatische deployment naar je website via SSH.

### Deployment Setup

De workflow deployt automatisch naar je website wanneer er code naar de `main` branch wordt gepusht.

### Vereiste GitHub Secrets

Ga naar je repository **Settings** > **Secrets and variables** > **Actions** en voeg de volgende secrets toe:

| Secret | Beschrijving | Voorbeeld |
|--------|--------------|-----------|
| `SSH_PRIVATE_KEY` | Je SSH private key voor toegang tot de server | Inhoud van `~/.ssh/id_rsa` |
| `SSH_HOST` | Hostname of IP-adres van je server | `htools.nl` of `192.168.1.100` |
| `SSH_USERNAME` | SSH gebruikersnaam | `root` of `gebruiker` |
| `SSH_PORT` | SSH poort (optioneel, default: 22) | `22` of `2222` |
| `DEPLOY_PATH` | Pad op de server waar bestanden geplaatst worden | `/var/www/html/top-2000-tool` |

#### 📁 Deployment naar Subdirectory

Voor deployment naar `htools.nl/top-2000-tool`:

```bash
# DEPLOY_PATH moet de volledige subdirectory bevatten
DEPLOY_PATH=/var/www/html/top-2000-tool

# Of als je webroot anders is:
DEPLOY_PATH=/home/gebruiker/public_html/top-2000-tool
```

**Meerdere repositories op 1 domein:**
- Repository 1: `DEPLOY_PATH=/var/www/html/top-2000-tool` → `htools.nl/top-2000-tool`
- Repository 2: `DEPLOY_PATH=/var/www/html/ander-project` → `htools.nl/ander-project`
- Repository 3: `DEPLOY_PATH=/var/www/html/nog-een-tool` → `htools.nl/nog-een-tool`

Elke repository gebruikt dezelfde `SSH_HOST`, `SSH_USERNAME` en `SSH_PRIVATE_KEY`, maar een ander `DEPLOY_PATH`.

#### 🎵 Spotify Redirect URI voor Subdirectory

De app detecteert automatisch de juiste redirect URI. Voor `htools.nl/top-2000-tool/index.html` gebruik je in Spotify Developer Dashboard:

```
https://htools.nl/top-2000-tool/index.html
```

De redirect URI wordt dynamisch gegenereerd, dus je hoeft niets in de code aan te passen! 🎉

### SSH Key Genereren

Als je nog geen SSH key hebt:

```bash
# Genereer een nieuwe SSH key
ssh-keygen -t ed25519 -C "github-actions-deploy"

# Kopieer de public key naar je server
ssh-copy-id -i ~/.ssh/id_ed25519.pub gebruiker@jouwserver.nl

# Toon de private key (kopieer deze naar GitHub Secrets)
cat ~/.ssh/id_ed25519
```

### Workflow Triggers

De deployment wordt automatisch gestart bij:
- Push naar de `main` branch
- Merge van een pull request naar `main`

De workflow:
1. ✅ Checkt de code uit
2. ✅ Configureert SSH authenticatie
3. ✅ Synchroniseert bestanden via rsync
4. ✅ Verwijdert tijdelijke SSH keys
5. ✅ Excludeert `.git`, `.github` en `stappenlijst.md`

### Deployment Status

Check de deployment status in de **Actions** tab van je repository.

## 📧 Support

Heb je vragen of problemen? Check de troubleshooting sectie hierboven of open een issue op GitHub.

---

**Veel plezier met het tracken van je favoriete nummers! 🎵**
