# DevFest 2025 Website

![DevFest Logo](public/logo/devfest_2025_logo.png) <!-- Replace with actual logo path if available -->

Welcome to the official website for DevFest 2025! This is a Next.js-based static site built for the Google Developer Groups (GDG) DevFest event. It showcases event details, speakers, sponsors, schedules, galleries, and more. The site integrates Firebase for auth/storage/analytics and Nodemailer for email handling.

## Features
- Responsive design with custom components
- Dynamic content via data files (e.g., speakers, sponsors)
- Gallery with hover highlights
- Email templates for registrations/invitations
- Firebase integration for client-side features
- SEO-optimized with Next.js

## Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Firebase project setup (for env vars)
- SMTP service (e.g., Gmail, SendGrid) for emails

### Installation
1. Clone the repo:
   ```
   git clone https://github.com/GDG-CONSTANTINE/devfest-2025.git
   cd devfest-2025
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) below).

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

5. Build for production:
   ```
   npm run build
   npm start
   ```

## Project Structure
The project follows Next.js App Router conventions. Key folders and their purposes:

### `public/` (Static Assets)
Serves files directly to the browser. Do not modify paths here—update via imports in code.
- **`icons/`**: Social media icons (e.g., Twitter, LinkedIn). Add new icons as needed.
- **`logo/`**: Event and sponsor logos. **When adding sponsors**: Upload their logo (SVG/PNG, 200x100px recommended) here and reference in `app/data/sponsors.js`.
- **`stickers/`**: Google-provided DevFest stickers. These **must** be used on the website (e.g., in footer or hero section). Do not remove or alter.
- **`images/`**:
  - **`gallery/`**: Past DevFest event images for the photo gallery section.
  - **`pfp/`**: Speaker profile pictures (pfps, 300x300px recommended). Also includes a single hero section image (e.g., `google_colord_strips.png`).

### `app/` (Next.js Pages & Data)
- **`data/`**: JSON/JS files for dynamic content. Edit these to update site sections without code changes.
  - `schedule.ts`: Event schedule data (times, sessions, tracks).
  - `sponsors.ts`: Sponsor list (names, tiers, logos from `public/logo/`).
  - `speakers.ts`: Speaker details (names, bios, pfps from `public/images/pfp/`).
  - `settings.ts`: Mainly managing time now to set date for countdowns and schedule.
  - Other files (one per section).
  - **Note**: Gallery hover text/highlights are **not** here—edit in `components/custom/gallery.js` (array of image objects with `highlights` fields).

- **`models/`** (in routes, e.g., `app/api/models/`): TypeScript classes for data models.
  - `Schedule.ts`: Defines schedule structure.
  - `Sponsor.ts`: Sponsor object schema.
  - `Speaker.ts`: Speaker profile schema.
  Use these for type safety in data files and components.

### `components/custom/`
Custom React components for reusable UI elements.
- **`gallery.js`**: Photo gallery component. Handles image grid, hovers, and highlights. Edit hover text here (e.g., `images.map(img => ({ ...img, highlight: 'Custom text' }))`).
- Other components: Hero, ScheduleTable, SpeakerCard, SponsorGrid, etc. All site-specific logic lives here.

### `lib/`
Utility functions and non-component code.
- **`emailTemplate.js`**: Nodemailer email templates (e.g., registration confirmations). Customize subjects, HTML bodies, etc.

### `app/services`
Hold all logic for backend from email to db through firebase logic it's simple and straight forward

## Updating Content
1. **Event Data**: Edit files in `app/data/` (e.g., add speakers to `speakers.js` with `{ name: 'John Doe', bio: '...', pfp: '/images/pfp/john.jpg' }`).
2. **Sponsors**: Add logo to `public/logo/`, then update `app/data/sponsors.js`.
3. **Gallery**: Upload images to `public/images/gallery/`. Update highlights in `components/custom/Gallery.js`.
4. **Speakers/Hero**: Add pfps to `public/images/pfp/`. Reference in `speakers.js` or hero component.
5. **Schedule**: Modify `app/data/schedule.js` and ensure it matches `models/Schedule.ts`.
6. **Emails**: Tweak templates in `lib/emailTemplate.js`.
7. **Test Changes**: Run `npm run dev` and check sections. Build/deploy for prod.

**Pro Tip**: Use TypeScript for data validation—run `npm run type-check` before committing.

## Environment Variables
Create a `.env.local` file in the root. Use `.env.example` as a template.

### Firebase Config (Client-Side - Prefix with `NEXT_PUBLIC_`)
These are exposed to the browser for Firebase SDK. Get from your Firebase Console > Project Settings > General > Your apps.
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Nodemailer (Server-Side)
For sending emails (e.g., via SMTP). Secure your credentials!
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## Deployment
- **Vercel** (Recommended for Next.js): Connect GitHub repo, add env vars in dashboard. Auto-deploys on push.
- **Netlify**: Drag-drop build or Git integration.
- **Firebase Hosting**: Run `npm run build`, then `firebase deploy`.
- Custom domain: Set in hosting provider.


*Built by GDG Constantine. Powered by Next.js & Firebase.*  
*Last Updated: November 18, 2025.*
*<br>Design: [Taha Necib - devfest_2025 - (initial design changed in code)](https://www.figma.com/design/tD9XjaeTyCWepWd5CL50yN/Untitled?node-id=0-1&t=p4D4F8gwIIlmOLDj-1).</br>*
*Sig: [Taha Necib](https://github.com/TahaNacibe).*