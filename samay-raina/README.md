# India's Got Latent — Season 2 (Samay Raina)

The official web portal for comedian Samay Raina's talent show, **India's Got Latent (Season 2)**. This application serves as the central hub for show information, tour dates, and participant/audience registrations.

Built with a focus on premium aesthetics, 3D animations, and high performance.

---

## 🛠️ Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Styling**: Vanilla CSS (`globals.css`) with Tailwind CSS for utility classes
* **Animations**: GSAP (ScrollTrigger) & Framer Motion
* **Testing**: Playwright (End-to-End Automation)
* **Language**: TypeScript

---

## 📁 Project Structure

```text
samay-raina/
├── public/                 # Static assets (images, fonts, favicons)
│   ├── samay-hero.jpg      # Hero background image
│   └── chess-piece.png     # Floating 3D chess element
│
├── src/
│   ├── app/                # Next.js App Router Pages
│   │   ├── about/          # /about page route
│   │   ├── apply/          # Application forms
│   │   │   ├── audience/   # Audience registration form
│   │   │   └── participant/# Participant registration form
│   │   ├── globals.css     # Core design system & global animations
│   │   ├── layout.tsx      # Root layout wrapper (Navbar & Footer)
│   │   └── page.tsx        # Main landing page
│   │
│   ├── components/         # Reusable React Components
│   │   ├── layout/         # Navbar, Footer
│   │   └── sections/       # Modular page sections
│   │       ├── Hero.tsx      # Main landing hero with 3D text intro
│   │       ├── About.tsx     # Information block
│   │       ├── Shows.tsx     # Tour dates with dynamic filtering
│   │       ├── ChessStory.tsx# Animated chess board section
│   │       └── QuoteWall.tsx # Masonry-style floating quotes
│   │
│   ├── data/               # Static JSON data files
│   │   ├── content.json    # Site copy & configuration
│   │   ├── shows.json      # Upcoming shows data
│   │   └── states-cities.json # Geography data for dynamic form dropdowns
│   │
│   └── hooks/              # Custom React hooks
│       └── useReducedMotion.ts # Accessibility hook for animations
│
├── tests/                  # Playwright E2E Automation Tests
│   ├── forms.spec.ts       # Validates form rendering, dropdowns & submission
│   ├── home.spec.ts        # Validates GSAP animations & dropdown filters
│   └── navigation.spec.ts  # Validates routing across pages
│
└── playwright.config.ts    # E2E Testing configuration
```

---

## 🚀 Features

* **Advanced 3D Animations**: Implements complex timeline-based scrolling animations using GSAP and Framer Motion. Elements rotate, scale, and fade natively mapped to user scroll depth.
* **Dynamic Registration Forms**: Complex multi-step forms mapping hierarchical JSON data (e.g. States -> Cities) with rigorous client-side validation.
* **Filterable Tour Dates**: Instantly sort upcoming shows by City or Show Type via native React state.
* **Automated E2E Testing**: Fully integrated robotic testing pipeline via Playwright to ensure zero regressions in UI or forms.

---

## 💻 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   *The app will be running at [http://localhost:3000](http://localhost:3000)*

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

---

## 🤖 Automation Testing (Playwright)

The application is fully covered by automated UI tests. The robot will simulate clicks, inputs, and verify animations.

* **Run all tests headlessly:**
  ```bash
  npm run test:e2e
  ```

* **Run tests with live UI Trace Viewer (Highly Recommended):**
  ```bash
  npm run test:ui
  ```

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel** (the creators of Next.js).

1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com).
3. Click **Add New -> Project**.
4. Import your GitHub repository.
5. Vercel will auto-detect Next.js. Leave all build settings as default.
6. Click **Deploy**.

*Alternative platforms: Netlify, AWS Amplify, or Docker via Railway.*
