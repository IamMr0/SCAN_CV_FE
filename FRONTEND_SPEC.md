# Frontend Development Specification
## The Intelligence Ledger — CV Scanning & JD Matching App

---

## 1. Project Overview

Build a **React single-page application** for a company's internal recruitment tool. The system has two roles:

- **Admin (Company/HR)**: Uploads Job Descriptions (JDs), manages active JD campaigns, views candidate match results.
- **Employee/Candidate**: Uploads their CV; the AI scans it and returns a match score against available JDs.

The AI analysis is handled by a backend API. The frontend consumes API responses and renders structured match results.

---

## 2. Design System & Visual Identity

### Brand
- **App name**: The Intelligence Ledger
- **Tagline**: Precision Talent Curation

### Color Tokens (use as Tailwind custom colors — already configured)
```
primary:                #0040a1
primary-container:      #0056d2
primary-fixed:          #dae2ff
primary-fixed-dim:      #b2c5ff
on-primary:             #ffffff
on-primary-fixed:       #001847
on-primary-fixed-variant: #0040a1

secondary:              #4a5d8e
secondary-container:    #b3c5fd
secondary-fixed:        #dae2ff
secondary-fixed-dim:    #b3c5fd
on-secondary:           #ffffff
on-secondary-fixed:     #001847
on-secondary-fixed-variant: #324575
on-secondary-container: #3e5181

tertiary:               #822800
tertiary-container:     #a93802
tertiary-fixed:         #ffdbcf
tertiary-fixed-dim:     #ffb59b
on-tertiary:            #ffffff
on-tertiary-fixed:      #380d00
on-tertiary-fixed-variant: #812800
on-tertiary-container:  #ffcebd

surface:                #f9f9fd
surface-bright:         #f9f9fd
surface-dim:            #d9dadd
surface-container-lowest: #ffffff
surface-container-low:  #f3f3f7
surface-container:      #edeef1
surface-container-high: #e7e8eb
surface-container-highest: #e2e2e6
on-surface:             #191c1e
on-surface-variant:     #424654

background:             #f9f9fd
on-background:          #191c1e

outline:                #737785
outline-variant:        #c3c6d6

error:                  #ba1a1a
error-container:        #ffdad6
on-error:               #ffffff
on-error-container:     #93000a
```

### Typography
```js
fontFamily: {
  headline: ["Manrope"],   // headings, nav, labels, buttons
  body:     ["Inter"],     // body copy, inputs, descriptions
  label:    ["Inter"],
}
```
Import via Google Fonts:
```
https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap
```

### Border Radius
```js
borderRadius: {
  DEFAULT: "0.125rem",
  lg:      "0.25rem",
  xl:      "0.5rem",
  full:    "0.75rem",
}
```

### Icons
Use **Material Symbols Outlined** via Google Fonts CDN. Apply `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;` by default.

### Utility Classes
```css
.glass-insight {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.whisper-shadow {
  box-shadow: 0 20px 40px rgba(25, 28, 30, 0.04);
}
```

---

## 3. Folder Structure

```
src/
├── components/
│   ├── NavBar.jsx          # Top navigation bar
│   └── Footer.jsx          # Footer component
├── hooks/
│   └── something.js        # (existing, do not modify)
├── pages/
│   ├── Overview.jsx        # Landing/overview page
│   ├── Login.jsx           # Sign-in page
│   ├── Register.jsx        # Registration page
│   ├── JobList.jsx         # Admin: view all JD campaigns
│   ├── UploadJD.jsx        # Admin: upload & manage JDs
│   └── UploadCV.jsx        # Employee: upload CV, view match result
├── service/
│   └── api.js              # Axios/fetch API layer
├── App.js                  # Routes
├── App.css
└── index.js
```

---

## 4. Routing (`App.js`)

Use `react-router-dom` v6.

| Path | Component | Access |
|---|---|---|
| `/` | `Overview` | Public |
| `/login` | `Login` | Public |
| `/register` | `Register` | Public |
| `/jobs` | `JobList` | Admin only |
| `/jobs/upload` | `UploadJD` | Admin only |
| `/cv` | `UploadCV` | Employee |

Implement a basic `PrivateRoute` wrapper that checks `localStorage` for an `authToken`. Redirect unauthenticated users to `/login`.

---

## 5. Components

### 5.1 `NavBar.jsx`

**Desktop layout** (sticky top bar):
- Left: App logo icon (`account_balance_wallet` Material Symbol) + "The Intelligence Ledger" in `font-headline font-black tracking-tighter`
- Center nav links: Overview · Job List · CV Upload · Matching — active link in `text-primary font-bold`, inactive in `text-on-surface/60`
- Right: Notification bell icon button + User avatar (circle, 40×40px)

**Mobile layout**: Hide center nav. Show hamburger or use bottom nav bar.

**Bottom nav bar** (mobile only, `md:hidden`, fixed bottom):
- 4 items: Overview (`dashboard`), Job List (`work`), CV Upload (`cloud_upload`), Matching (`analytics`)
- Active item: `text-primary bg-blue-50/50 rounded-xl`
- Inactive: `text-on-surface/50`

---

### 5.2 `Footer.jsx`

Full-width footer, `bg-surface-container-low py-12 px-8`.

Three-column flex row (stack on mobile):
1. Logo + App name
2. Links: Privacy Policy · Terms of Service · Help Center
3. Copyright: `© 2024 The Intelligence Ledger. All rights reserved.`

---

## 6. Pages

---

### 6.1 `Overview.jsx` (Landing Page)

Reference: `app_overview.html`

**Section 1 — Hero** (12-col grid, 7+5):
- Left (7 cols):
  - Eyebrow: "The Digital Curator" in `text-tertiary font-bold uppercase tracking-widest text-sm`
  - H1: "Precision Talent Curation." — `text-6xl font-headline font-extrabold`
  - Body paragraph
  - Two CTA buttons: "Explore Matching" (gradient primary) + "How it Works" (outlined)
- Right (5 cols):
  - Square image card with `rounded-3xl overflow-hidden shadow` — use a placeholder or abstract image
  - Glassmorphism card overlay (`.glass-insight`): "AI Insight" label + insight text

**Section 2 — Methodology** (3-col Bento cards):
Each card: `bg-surface-container-lowest p-10 rounded-3xl hover:bg-surface-container-high`
1. **Ingest** — icon: `cloud_upload`, bg: `primary-fixed`
2. **Analyze** — icon: `psychology`, bg: `tertiary-fixed`
3. **Match** — icon: `hub`, bg: `secondary-fixed`

Each has a progress bar at the bottom.

**Section 3 — Metrics** (12-col, 5+7, image left):
- Left: portrait image + glassmorphism badge "98% Match Accuracy"
- Right: headline + 4 stats in 2×2 grid, each with colored left border

**Section 4 — CTA Rail**:
- `bg-surface-container-lowest rounded-[48px] p-20 text-center` with blurred blob decorations
- Two buttons: "Get Started" (`rocket_launch` icon) + "Contact Consultant" (`contact_support` icon)

---

### 6.2 `Login.jsx`

Reference: `sign_in.html`

Two-column layout (`max-w-[1100px] grid md:grid-cols-2`):

**Left panel** (`bg-primary text-on-primary`):
- Logo + App name
- H1 headline
- Body text in `text-on-primary-container`
- "Insight of the day" quote card (`bg-white/10 backdrop-blur-md`)
- Abstract background image overlay (`opacity-30 mix-blend-overlay`)

**Right panel** (`bg-surface-container-lowest p-16`):
- "Welcome Back" heading
- Form fields:
  - Email Address (type=email)
  - Password (type=password) with "Forgot Password?" link
  - "Remember this device for 30 days" checkbox
- Submit button: gradient primary, full width
- Divider: "New to the Ledger?"
- "Create Professional Account" link button → `/register`

Background ambient blobs (absolute positioned, blurred, behind form container).

---

### 6.3 `Register.jsx`

Reference: `register.html`

Two-column layout (same structural split as Login):

**Left panel** (`bg-surface-container-low`):
- "Institutional Access" pill badge
- H1 with `<span class="text-primary">` accent
- Body paragraph
- Glassmorphism card: "Digital Curator Insight" with AI quote

**Right panel** (`bg-background p-24`):
- "Initialize Credentials" heading
- Form fields:
  - Full Name
  - Email Address
  - Password + Confirm Password (2-col grid)
  - Terms checkbox with links
- "Register" button (gradient primary)
- Footer: "Already have an account? Sign In" → `/login`

---

### 6.4 `UploadJD.jsx` (Admin)

Reference: `jd_management.html`

**Header**: "Job Descriptions" title + nav tabs (Overview · JD Upload · History) + notification + avatar initials

**Main layout** (12-col grid, 8+4):

**Left (8 cols) — Upload Panel** (`bg-surface-container-low rounded-3xl p-8`):
- Title: "Upload Job Description" + "Editor v2.4" badge
- `<textarea>` (h-64) with placeholder "Paste the full job description here..."
- Two action buttons below:
  - "Choose File (PDF, DOCX)" — dashed border, `upload_file` icon
  - "Process Ledger" — gradient primary, `auto_awesome` icon

**Right (4 cols)**:
1. Configuration card (`bg-white rounded-3xl p-8`):
   - "Server Notifications" toggle (CSS-only switch, default ON)
   - "System Load" progress bar (42% utilization)
2. AI Insights card (glassmorphism): tip text with `text-primary font-bold` highlight

**Manage JDs Section** (full width below):
- Section header: "Manage JDs" + active count + ACTIVE/ARCHIVED tab toggle + filter button
- 3-column card grid (responsive: 1→2→3):

Each JD card (`bg-surface-container-lowest p-6 rounded-3xl hover:bg-surface-container-high`):
- Icon (12×12, colored bg, rounded-2xl) + status badge (top row)
- Job title (`text-lg font-bold`) + location/team subtitle
- Bottom row: candidate avatar stack + AI confidence % with `trending_up` icon

**Sample JD Cards**:
| Title | Location | Icon | Status | Confidence |
|---|---|---|---|---|
| Principal Systems Architect | Remote · Tech-Infra | `code` (blue) | High Match (green) | 89% |
| Lead Product Designer | New York · UX Studio | `palette` (tertiary) | Evaluating (gray) | 72% |
| VP of Global Fintech | London · Finance Core | `payments` (secondary) | Urgent (amber) | 94% |

**Bottom mobile nav** (fixed): Talent · Jobs (active) · Analysis · Profile

---

### 6.5 `JobList.jsx` (Admin)

Displays all JD campaigns in a full-page searchable/filterable list.

**Layout**:
- Header: "Active Campaigns" + search input + filter/sort controls
- Full-width list of JD cards (same card design as `UploadJD` grid but in list format, full width)
- Each row: icon + job title + location + status badge + candidate count + AI confidence + "View Details" chevron
- Pagination or "Load More" at bottom

**Filter controls**:
- Search by job title (input with `search` icon)
- Filter by status: All · Active · Evaluating · Urgent · Archived (pill buttons)

---

### 6.6 `UploadCV.jsx` (Employee)

Reference: `user.html`

**Header**: "Digital Talent Orchestration" + "Curation Hub" eyebrow label

**Main layout** (12-col, 8+4):

**Left (8 cols)**:

1. Upload Section (`bg-surface-container-lowest p-8 rounded-2xl`):
   - "Ingest Talent Data" title + "PDF, DOCX, or JSON supported" note
   - Drag & drop zone:
     - Dashed border, `bg-surface-container-low/50`
     - `upload_file` icon (64×64 circle bg)
     - "Drag & drop candidate dossiers" title
     - "or browse files from your secure drive" body
     - "Initialize Batch Analysis" button (gradient primary)
   - On file selection: show filename chip below drop zone

2. Match Result Section (appears AFTER upload, initially hidden):
   - "AI Match Report" heading + candidate name
   - Large match score display: e.g. `98.4%` in `text-5xl font-black text-primary`
   - Matched JD title + company role
   - Breakdown table:
     | Criterion | Score | Status |
     |---|---|---|
     | Technical Skills | 96% | ✅ Strong |
     | Cultural Alignment | 91% | ✅ Strong |
     | Experience Level | 88% | ✅ Good |
     | Leadership Potential | 74% | ⚠️ Moderate |
   - AI narrative summary paragraph
   - "Re-analyze" + "Download Report" action buttons

3. Curation History (`bg-surface-container-lowest` list):
   - Each row: candidate avatar + name + role + time applied + AI match % + chevron
   - Sample entries: Dr. Julian Thorne (98.4%), Elena Rodriguez (92.1%), Marcus Chen (87.5%)

**Right (4 cols)**:

1. "Active Intelligence" glassmorphism card:
   - "Deep Semantic Indexing" progress bar (84%) with italic description
   - "Skill Verification Relay" animated pulse bar with description
   - Divider
   - "Curation Metrics" 2×2 grid: Tokens Indexed (1.4M) · Match Accuracy (99.2%)

2. Pro-tip card (`bg-primary-container text-white rounded-2xl p-6`):
   - `auto_awesome` decorative icon (absolute, large, `opacity-10`)
   - "Intelligence Pro-Tip" label + tip text

**Bottom mobile nav** (fixed): Overview (active) · Job List · CV Upload · Matching

---

## 7. API Layer (`service/api.js`)

Set up Axios with a base URL from `process.env.REACT_APP_API_URL`.

```js
// Suggested exports:

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (payload) => api.post('/auth/register', payload);

// JD Management
export const getJDs = () => api.get('/jds');
export const uploadJD = (text, file) => { /* FormData */ };
export const processJD = (jdId) => api.post(`/jds/${jdId}/process`);

// CV Upload & Matching
export const uploadCV = (file, jdId) => { /* FormData */ };
export const getMatchResult = (cvId) => api.get(`/cv/${cvId}/match`);
export const getCurationHistory = () => api.get('/cv/history');
```

Add a request interceptor to attach `Authorization: Bearer <token>` from `localStorage`.

Add a response interceptor: on 401, clear token and redirect to `/login`.

---

## 8. State Management

Use React built-in state (`useState`, `useEffect`, `useContext`).

**Auth Context** (`src/context/AuthContext.js`):
```js
{
  user: null | { name, email, role: 'admin' | 'employee' },
  token: null | string,
  login: async (email, password) => {},
  logout: () => {},
  isAuthenticated: boolean,
  isAdmin: boolean,
}
```

Wrap `<App>` with `<AuthProvider>`.

---

## 9. Key UX Behaviors

| Behavior | Implementation |
|---|---|
| Upload drag & drop | `onDragOver`, `onDrop` handlers on drop zone div; toggle `border-primary` highlight on drag |
| File type validation | Accept only `.pdf`, `.docx`, `.json`; show error toast on invalid type |
| Upload progress | Show animated progress bar during upload (fake or real via `onUploadProgress`) |
| Match result reveal | Animate result card in with `opacity-0 → opacity-100` + `translateY(20px) → 0` |
| Match score counter | Animate number from 0 to final value over ~1.2s on reveal |
| Loading states | Skeleton shimmer on cards while fetching; spinner on buttons during submit |
| Empty states | Show illustrated empty state message when no JDs or history exist |
| Toast notifications | Success/error toasts (top-right, auto-dismiss 3s) for upload, process, errors |

---

## 10. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `< md` (mobile) | Single column, bottom nav bar visible, top nav links hidden |
| `md` (tablet) | Two-column grids, top nav visible, bottom nav hidden |
| `lg+` (desktop) | Full 12-col layouts, sidebar panels |

`body { min-height: max(884px, 100dvh); }`

---

## 11. Accessibility

- All form inputs must have associated `<label>` elements
- Icon-only buttons must have `aria-label`
- Color contrast must meet WCAG AA on all text
- Drag & drop zone must also support click-to-open file picker
- Focus rings: use `focus:ring-2 focus:ring-primary/40`

---

## 12. Dependencies

```json
{
  "react": "^18",
  "react-router-dom": "^6",
  "axios": "^1",
  "tailwindcss": "^3"
}
```

Tailwind plugins: `@tailwindcss/forms`, `@tailwindcss/container-queries`

Google Fonts loaded via `<link>` in `public/index.html`.

---

## 13. Implementation Priority

| Priority | Task |
|---|---|
| P0 | Tailwind config setup with full color/font tokens |
| P0 | `NavBar`, `Footer` components |
| P0 | `Login`, `Register` pages |
| P1 | `UploadCV` page (core employee flow) |
| P1 | `UploadJD` page (core admin flow) |
| P1 | Auth context + `api.js` |
| P2 | `Overview` landing page |
| P2 | `JobList` page |
| P3 | Animations, transitions, match result reveal |
| P3 | Toast notifications, empty states, skeleton loaders |

---

## 14. Notes for AI Agent

- Do **not** use `<form>` tags — use `onClick`/`onChange` handlers with controlled state.
- Do **not** use `localStorage` or `sessionStorage` inside artifacts/components directly — use the Auth context.
- All pages should be **functional components** with hooks only.
- Match the visual style of the provided HTML templates precisely: rounded corners, gradient buttons, glassmorphism panels, editorial typography.
- The glassmorphism `.glass-insight` class must be applied to the right rail AI panel on `UploadCV` and the insight cards on `Overview`.
- Use `material-symbols-outlined` class for all icons with the correct `font-variation-settings`.
- Gradient buttons use: `bg-gradient-to-br from-primary to-primary-container text-white`.
- Hover effects on cards: `hover:bg-surface-container-high transition-all`.
