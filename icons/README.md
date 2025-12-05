# App Icons

Deze directory bevat de app icons die nodig zijn voor de "Add to Home Screen" functionaliteit op iOS en Android.

## Icons Genereren

1. Open `generate-icons.html` in je browser
2. Klik op **"Download Alle Icons"** om alle icon formaten te downloaden
3. Plaats de gedownloade icons in deze `icons/` directory

## Benodigde Icon Formaten

De volgende icon formaten zijn vereist:
- `icon-72.png` (72x72px)
- `icon-96.png` (96x96px)
- `icon-128.png` (128x128px)
- `icon-144.png` (144x144px)
- `icon-152.png` (152x152px) - Apple Touch Icon
- `icon-192.png` (192x192px) - Android
- `icon-384.png` (384x384px)
- `icon-512.png` (512x512px) - PWA

## Design

Alle icons hebben:
- Een gradient achtergrond (#667eea → #764ba2)
- Een wit radio icon (Font Awesome fa-radio)
- PNG formaat voor maximale compatibiliteit

## PWA Ondersteuning

Deze icons worden gebruikt voor:
- **iOS**: Apple Touch Icon voor "Add to Home Screen"
- **Android**: PWA icon voor "Install App"
- **Desktop**: Browser favicon
- **Windows**: Tile icon

## Automatische Deployment

Wanneer je de icons commit en push naar de repository, worden ze automatisch gedeployed via de GitHub Actions workflow naar je website.
