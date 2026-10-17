# Reflex.io

Live: https://reflexio-sigma.vercel.app

A mobile-first reflex reaction game built with React, TypeScript, and CSS Modules.

## Quick Start

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── GameBoard/
│   │   ├── GameBoard.tsx
│   │   ├── GameBoard.module.css
│   │   └── GameBoard.types.ts
│   ├── HistoryScreen/
│   │   ├── HistoryScreen.tsx
│   │   ├── HistoryScreen.module.css
│   │   └── HistoryScreen.types.ts
│   ├── Home/
│   │   ├── Home.tsx
│   │   ├── Home.module.css
│   │   └── Home.types.ts
│   ├── HUD/
│   │   ├── HUD.tsx
│   │   ├── HUD.module.css
│   │   └── HUD.types.ts
│   ├── ProgressBar/
│   │   ├── ProgressBar.tsx
│   │   └── ProgressBar.module.css
│   ├── ReflexBox/
│   │   ├── ReflexBox.tsx
│   │   ├── ReflexBox.module.css
│   │   └── ReflexBox.types.ts
│   ├── ResultScreen/
│   │   ├── ResultScreen.tsx
│   │   ├── ResultScreen.module.css
│   │   └── ResultScreen.types.ts
│   └── ThemeToggle/
│       ├── ThemeToggle.tsx
│       └── ThemeToggle.module.css
├── hooks/
│   ├── useGameLoop.ts     — timer logic, box reveal, timeout, cleanup
│   ├── useHistory.ts      — localStorage round history
│   └── useTheme.ts        — light/dark theme toggle + persistence
├── utils/
│   ├── config.ts          — difficulty config constants
│   └── gameUtils.ts       — helpers: getRand, getRandomPosition, getReflexMessage, etc.
├── types/
│   └── game.types.ts      — all shared TypeScript types
├── styles/
│   └── global.css         — CSS variables for light + dark theme, reset
├── App.tsx
└── main.tsx
```

## Difficulty Levels

| Level  | Interval | Delay Range | Click Window |
|--------|----------|-------------|--------------|
| Easy   | 20ms     | 4–7s        | 5000ms       |
| Medium | 10ms     | 2–5s        | 3500ms       |
| Hard   | 5ms      | 2–3s        | 2000ms       |

## Features

- 🎯 Random box position on every round (fully within viewport, mobile-safe)
- ⏱ Live reflex counter from first box appearance
- 📊 Draining progress bar with color feedback (green → amber → red)
- 🏆 Personal best tracking with new PB badge
- 🔥 Streak counter — resets on timeout
- 📱 Mobile-first responsive design, `touch-action: manipulation` for fast taps
- 🌙 Light / Dark theme toggle, persisted to localStorage
- 💾 Round history persisted to localStorage (last 20 rounds)
- 🏃 Timeout rounds tracked separately as "MISSED"
