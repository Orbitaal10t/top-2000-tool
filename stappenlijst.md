# NPO Radio 2 - Now Playing Tracker

## Projectomschrijving
Een HTML-gebaseerde website die het nummer toont dat op dit moment wordt afgespeeld op NPO Radio 2, met de mogelijkheid om nummers toe te voegen aan een persoonlijke lijst voor de Top 2000 stemming.

## Functionaliteiten

### 1. Now Playing Display
- Toon de artiest en titel van het nummer dat momenteel wordt afgespeeld op NPO Radio 2
- Haal deze informatie op via de NPO Radio 2 API of een geschikte data source
- Update automatisch wanneer er een nieuw nummer begint

### 2. Toevoegen aan Lijst
- Een duidelijke knop ("Voeg toe aan stemlijst" of vergelijkbaar)
- Bij klikken wordt het huidige nummer toegevoegd aan de persoonlijke lijst
- Voorkom duplicaten in de lijst
- Geef visuele feedback wanneer een nummer is toegevoegd

### 3. Stemlijst Overzicht
- Toon alle opgeslagen nummers in een overzichtelijke lijst
- Elk item toont: Artiest - Titel
- Mogelijkheid om nummers uit de lijst te verwijderen
- **Opslag opties:**
  - **Optie A: Lokaal (localStorage)** - Lijst wordt lokaal opgeslagen, blijft bewaard bij herladen
  - **Optie B: Spotify Playlist** - Nummers worden direct toegevoegd aan een Spotify playlist
  - Gebruiker kan kiezen welke optie te gebruiken (of beide)

### 4. Keuze tussen Opslag Opties
- **Toon duidelijke vergelijking** voor de gebruiker tussen lokale opslag en Spotify:
  
  **Lokale Opslag:**
  - ✅ Geen account nodig
  - ✅ Werkt offline
  - ❌ Alleen op dit apparaat + deze browser
  - ❌ Niet privé bij gedeeld apparaat
  - ❌ Verdwijnt bij cache wissen
  
  **Spotify (AANBEVOLEN):**
  - ✅ Sync tussen al je apparaten
  - ✅ Altijd privé (eigen account)
  - ✅ Direct afspelen via Spotify
  - ✅ Permanent opgeslagen
  - ❌ Vereist Spotify account (gratis is voldoende)

- **Prominente aanbeveling:** "Wij raden Spotify aan voor de beste ervaring en privacy"
- Gebruiker kan nog steeds lokaal kiezen als ze dat prefereren

### 5. Extra Functionaliteiten (optioneel)
- Telling van hoeveel nummers in de lijst staan
- Exporteer lijst als tekstbestand of kopieer naar klembord
- Visuele indicatie als een nummer al in de lijst staat
- Zoekfunctie binnen de opgeslagen lijst

## Technische Specificaties

### Stack
- Pure HTML, CSS en JavaScript (geen frameworks vereist)
- Gebruik localStorage voor persistente opslag
- Responsive design voor mobiel en desktop gebruik

### NPO Radio 2 API
- Gebruik de NPO API voor now playing informatie
- Endpoint: `https://www.nporadio2.nl/api/tracks/now`
- Of alternatief: gebruik een geschikte NPO data source
- Implementeer polling (bijvoorbeeld elke 10-30 seconden) voor updates

### Spotify API Integratie
- **Authenticatie:** Gebruik Spotify Web API met OAuth 2.0
- **Authorization Flow:** Authorization Code Flow with PKCE (beste voor client-side apps)
  - Ondersteunt refresh tokens voor langdurige sessies
  - Gebruiker blijft ingelogd totdat ze expliciet uitloggen
- **Vereiste Scopes:** 
  - `playlist-modify-public` (voor publieke playlists)
  - `playlist-modify-private` (voor private playlists)
  - `playlist-read-private` (om playlists te lezen)
- **Token Management:**
  - Access token: expires na 1 uur
  - Refresh token: blijft geldig (geen expiratie)
  - Access token wordt automatisch vernieuwd met refresh token
  - Gebruiker merkt niets van token vernieuwing
- **Endpoints:**
  - Search track: `https://api.spotify.com/v1/search?q=artist:${artist}%20track:${title}&type=track`
  - Add to playlist: `https://api.spotify.com/v1/playlists/{playlist_id}/tracks`
  - Token refresh: `https://accounts.spotify.com/api/token`
- **Setup vereisten:**
  - Spotify Developer Account
  - Registered App met Client ID
  - Redirect URI configuratie

### Workflow Spotify Integratie
1. Gebruiker authoriseert de app via Spotify login (eenmalig)
2. App ontvangt access token + refresh token
3. Tokens worden veilig opgeslagen in localStorage
4. Bij toevoegen van nummer: 
   - Controleer of access token nog geldig is
   - Zo niet: vernieuw automatisch met refresh token (gebruiker merkt niets)
   - Zoek track ID via Search API
   - Voeg track toe aan gespecificeerde playlist
5. Toon bevestiging in UI
6. **Gebruiker blijft permanent ingelogd** totdat ze op "Uitloggen" klikken

### Data Structuur
**Lokaal opgeslagen song:**
```javascript
{
  artist: "Artiestnaam",
  title: "Nummer titel",
  timestamp: "2024-12-04T12:00:00Z",
  spotifyUri: "spotify:track:xxxxx" // optioneel, als gevonden via Spotify API
}
```

**Spotify track object (van API):**
```javascript
{
  id: "track_id",
  uri: "spotify:track:xxxxx",
  name: "Track Name",
  artists: [{name: "Artist Name"}]
}
```

### Opslag
**Lokale opslag:**
- Sla de lijst op in localStorage onder key "top2000lijst"
- Format: JSON array met song objecten
- **Persistentie:** localStorage blijft bewaard totdat:
  - De gebruiker de browsercache/data handmatig wist
  - De gebruiker de site-data via browserinstellingen verwijdert
  - Er is geen automatische vervaldatum
- **Multi-user gedrag:**
  - localStorage is gekoppeld aan browser + domein + apparaat
  - Verschillende browsers op hetzelfde apparaat = verschillende opslag
  - Verschillende apparaten = verschillende opslag
  - Verschillende gebruikersprofielen in browser = verschillende opslag
  - **Let op:** Meerdere personen die dezelfde browser gebruiken zien dezelfde lijst!

**Spotify opslag:**
- Nummers worden toegevoegd aan een Spotify playlist
- Playlist ID wordt opgeslagen in localStorage
- **Access token:** wordt tijdelijk opgeslagen (expires na 1 uur)
- **Refresh token:** wordt veilig opgeslagen in localStorage (geen expiratie)
- **Automatische token refresh:** wanneer access token expired is, wordt deze automatisch vernieuwd met refresh token
- **Gebruiker blijft ingelogd:** totdat ze expliciet uitloggen of localStorage wordt gewist
- Gebruiker kan eigen playlist ID invoeren of app maakt nieuwe playlist aan
- **Multi-user gedrag:**
  - Elke gebruiker logt in met eigen Spotify account
  - Elke gebruiker heeft zijn eigen playlist
  - Automatisch per gebruiker gescheiden door Spotify authenticatie

## UI/UX Overwegingen
- Gebruik NPO Radio 2 kleuren en styling (optioneel)
- Duidelijke, grote knoppen voor mobiel gebruik
- Responsive layout
- Loading states tijdens API calls
- Error handling als API niet bereikbaar is
- **Opslag keuze scherm:**
  - Toon bij eerste gebruik een duidelijke vergelijking tussen lokaal en Spotify
  - Visueel overzichtelijk (bijv. twee kolommen met voor/nadelen)
  - Grote "Verbind met Spotify (aanbevolen)" knop
  - Kleinere "Gebruik lokaal" knop als alternatief
  - Uitleg over privacy aspecten: "Spotify = privé, Lokaal = gedeeld op dit apparaat"
- **Spotify specifiek:**
  - Duidelijke "Connect met Spotify" knop
  - Toon Spotify connectie status (verbonden/niet verbonden)
  - Geef feedback wanneer een nummer succesvol is toegevoegd aan Spotify
  - Fallback naar lokale opslag als Spotify niet beschikbaar is
  - Optie om later nog te switchen tussen opslag methodes

## Deliverables
1. Single HTML bestand met inline CSS en JavaScript
2. Werkende now playing functionaliteit
3. Werkende lijst met add/remove functionaliteit
4. Persistent opslag via localStorage
5. **Spotify integratie met OAuth flow (prioriteit voor privacy en beste UX)**
6. **Duidelijk keuze scherm met voor/nadelen en privacy uitleg**
7. Responsive design

## Belangrijke Privacy & UX Punten
- **Maak Spotify de standaard aanbeveling** in de UI
- Leg duidelijk uit dat lokale opslag niet privé is op gedeelde apparaten
- Benadruk dat Spotify gratis account voldoende is
- Geef gebruiker altijd de vrijheid om lokaal te kiezen, maar met waarschuwing
- Bij lokale opslag: toon melding "Let op: lijst is zichtbaar voor iedereen die deze browser gebruikt"

## Opmerkingen
- Zorg voor error handling bij API failures
- Test cross-browser compatibility
- Overweeg rate limiting bij API calls
- Implementeer debouncing voor de "toevoegen" knop om dubbele clicks te voorkomen
- **Spotify specifiek:**
  - OAuth flow vereist dat de app wordt gehost (niet lokaal file://)
  - Voor development: gebruik localhost met redirect URI
  - **Gebruik Authorization Code Flow with PKCE** (niet Implicit Grant Flow)
  - Access tokens expiren na 1 uur, maar worden automatisch vernieuwd met refresh token
  - Refresh tokens blijven geldig totdat gebruiker uitlogt of toegang intrekt
  - Implementeer token refresh logica: controleer expiratie voor elke API call
  - Niet alle nummers van NPO Radio 2 zijn beschikbaar op Spotify
  - Implementeer fuzzy matching voor betere track zoekresultaten
  - Voeg "Uitloggen" knop toe om tokens te wissen

## Multi-User Overwegingen

### Scenario's:
1. **Gedeeld apparaat/browser (bijv. gezins-PC):**
   - localStorage wordt gedeeld door iedereen die dezelfde browser gebruikt
   - **Aanbeveling:** Gebruik Spotify integratie (elke gebruiker logt in met eigen account)
   - Of: implementeer simpel gebruikerssysteem met localStorage keys per gebruiker (bijv. "top2000lijst_gebruiker1")

2. **Meerdere apparaten (bijv. telefoon + laptop):**
   - localStorage sync niet tussen apparaten
   - **Aanbeveling:** Gebruik Spotify integratie voor automatische sync
   - Of: implementeer export/import functionaliteit

3. **Privacy gevoelig:**
   - localStorage is zichtbaar voor iedereen met toegang tot de browser
   - **Aanbeveling:** Gebruik Spotify met private playlists

### Mogelijke Uitbreidingen:
- Voeg gebruikersnaam selectie toe bij lokale opslag
- Implementeer export naar JSON/CSV voor backup
- Voeg "Clear lijst" functionaliteit toe
- Optioneel: simpele PIN-code bescherming voor lokale lijst
