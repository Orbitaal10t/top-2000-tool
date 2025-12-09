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

### Voor Gebruikers

1. Open de app in je browser
2. Klik op **"Inloggen met Spotify"**
3. Log in bij Spotify en geef de app toegang
4. Klaar! Voeg nummers toe terwijl je luistert

### Voor Developers / Fork Owners

Als je je eigen versie van deze app host, moet je een Spotify Developer App aanmaken en de Client ID configureren:

## 📋 Spotify Developer Setup (Voor eigen deployment)

### Stap 1: Maak een Spotify Developer App

1. Ga naar [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in met je Spotify account (gratis account is voldoende)
3. Klik op **"Create app"**
4. Vul in:
   - **App name**: `NPO Radio 2 Tracker` (of een eigen naam)
   - **App description**: `Personal app to track NPO Radio 2 songs`
   - **Redirect URI**: De URL waar je de app host + `/index.html`
     - Lokaal: `http://localhost:8000/index.html`
     - GitHub Pages: `https://jouwgebruikersnaam.github.io/repository/index.html`
     - Eigen domein: `https://jouwdomein.nl/index.html`
   - **APIs used**: Selecteer **"Web API"**
5. Accepteer de terms en klik op **"Save"**
6. Kopieer je **Client ID** (je vindt deze op de app detail pagina)

**Let op**: Je hebt GEEN Client Secret nodig! We gebruiken PKCE voor veilige authenticatie.

### Stap 2: Configureer de App

**Optie A: Rechtstreeks in config.js (Aanbevolen)** ✅

1. Kopieer `config.example.js` naar `config.js`:
   ```bash
   cp config.example.js config.js
   ```
2. Open `config.js` en vul je Client ID in:
   ```javascript
   SPOTIFY_CLIENT_ID: 'jouw-echte-client-id-hier',
   ```
3. Commit en push `config.js` naar je repository
4. Klaar! 🎉

**Waarom is dit veilig?**
- ✅ Spotify Client ID is expliciet ontworpen om publiek te zijn
- ✅ De beveiliging zit in PKCE (Proof Key for Code Exchange)
- ✅ Er is geen Client Secret nodig of gebruikt
- ✅ Elke gebruiker die je website bezoekt kan de Client ID toch zien

**Optie B: Via de App zelf (Geen commit nodig)**

1. Open de app in je browser
2. Als de Client ID ontbreekt, verschijnt automatisch een setup scherm
3. Volg de instructies en plak je Client ID in de app
4. De app slaat deze op in je browser (localStorage)

Deze methode werkt, maar je moet de Client ID op elk apparaat opnieuw invoeren.

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

## 🚀 Automatische Deployment via SSH

Deze repository is geconfigureerd met GitHub Actions voor automatische deployment naar je website via SSH.

### Vereiste GitHub Secrets

Ga naar je repository **Settings** > **Secrets and variables** > **Actions** en voeg de volgende secrets toe:

| Secret | Beschrijving | Voorbeeld voor DirectAdmin |
|--------|--------------|----------------------------|
| `SPOTIFY_CLIENT_ID` | **Spotify Client ID** (zie setup hieronder) | `abc123def456...` |
| `SSH_PRIVATE_KEY` | Je SSH private key | Inhoud van `~/.ssh/id_ed25519` |
| `SSH_HOST` | Hostname van je server | `htools.nl` |
| `SSH_USERNAME` | SSH gebruikersnaam | Je DirectAdmin gebruikersnaam |
| `SSH_PORT` | SSH poort (optioneel, standaard 22) | `21098` of `22` |
| `DEPLOY_PATH` | **Absoluut pad** op server waar bestanden komen | `/home/USERNAME/domains/htools.nl/public_html/top-2000-tool` |

### 📁 DEPLOY_PATH Vinden in DirectAdmin

Het `DEPLOY_PATH` moet het **volledige absolute pad** zijn op je server:

1. Log in op DirectAdmin
2. Ga naar **File Manager**
3. Navigeer naar de juiste locatie (bijv. `public_html/top-2000-tool`)
4. Het volledige pad staat bovenaan de pagina

**DirectAdmin paden volgen meestal dit patroon:**
```
/home/USERNAME/domains/DOMEIN/public_html/SUBDIRECTORY
```

**Voorbeelden:**
- Hoofddirectory: `/home/username/domains/htools.nl/public_html`
- Subdirectory: `/home/username/domains/htools.nl/public_html/top-2000-tool`

**Voor meerdere repositories op 1 domein:**
- Repository 1: `/home/username/domains/htools.nl/public_html/top-2000-tool` → `htools.nl/top-2000-tool`
- Repository 2: `/home/username/domains/htools.nl/public_html/ander-project` → `htools.nl/ander-project`

### 🔑 SSH Key Setup

1. **Genereer een SSH key pair** (zonder wachtwoord):
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
   ```

2. **Voeg de public key toe aan DirectAdmin**:
   - Kopieer de public key: `cat ~/.ssh/github_deploy.pub`
   - DirectAdmin → **SSH Keys** → plak de public key
   - Of via SSH: `cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys`

3. **Test de verbinding**:
   ```bash
   ssh -i ~/.ssh/github_deploy username@htools.nl
   ```

4. **Voeg private key toe aan GitHub Secrets**:
   - Kopieer de private key: `cat ~/.ssh/github_deploy`
   - GitHub → Settings → Secrets → `SSH_PRIVATE_KEY`

### 🎵 Spotify Redirect URI

Voor `htools.nl/top-2000-tool/index.html` gebruik je in Spotify Developer Dashboard:
```
https://htools.nl/top-2000-tool/index.html
```
De redirect URI wordt dynamisch gegenereerd! 🎉

### 🚀 Deployment

De deployment start automatisch bij elke push naar `main`. Check de **Actions** tab voor de status.

**De workflow:**
1. ✅ Valideert alle secrets
2. ✅ Injecteert Spotify Client ID in index.html
3. ✅ Test SSH verbinding
4. ✅ Maakt deployment directory aan
5. ✅ Synchroniseert bestanden via rsync
6. ✅ Deployment compleet!

### 🎵 Hoe werkt de Spotify Client ID Injectie?

De Spotify Client ID wordt tijdens deployment automatisch in `index.html` geïnjecteerd:

```yaml
- name: Inject Spotify Client ID
  run: |
    sed -i "s/SPOTIFY_CLIENT_ID_PLACEHOLDER/${{ secrets.SPOTIFY_CLIENT_ID }}/g" index.html
```

Dit betekent:
- ✅ De Client ID wordt **nooit** in de repository opgeslagen
- ✅ De app werkt op **alle apparaten** zonder extra configuratie
- ✅ Gebruikers hoeven **geen setup** te doen
- ✅ Je kunt de Client ID gemakkelijk wijzigen via GitHub Secrets

**Voor lokale development**: Gebruik de "Custom Client Setup" functie in de app om tijdelijk je eigen Client ID in te voeren.

## 📧 Support

Heb je vragen of problemen? Check de troubleshooting sectie hierboven of open een issue op GitHub.

---

**Veel plezier met het tracken van je favoriete nummers! 🎵**
