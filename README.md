# Multibet App

Basic instructions to develop, build, test, and run the mock API.

## Requirements

- Node.js 18+ and npm

## Install dependencies

```bash
npm install
```

## Start the app (Vite dev server)

```bash
npm run dev
```

- App runs on the URL shown in the terminal (by default `http://localhost:5173`).

## Build for production

```bash
npm run build
```

## Run tests

```bash
npm test            # single run
npm run test:watch  # watch mode
```

## Mock API (json-server)

This project includes a mock API using `json-server` located in `src/mock`.

First-time setup (inside the mock folder):

```bash
cd src/mock
npm install
```

Start the mock server:

```bash
# normal start
npm run start

# or start with an artificial delay (useful for simulating latency)
npm run start:dev
```

- The mock server runs at `http://localhost:3001`.
- Data lives in `src/mock/db.json`.

## Quick checks

```bash
# List games
curl http://localhost:3001/games

# Create a bet
curl -X POST http://localhost:3001/bets \
  -H 'Content-Type: application/json' \
  -d '{"id":"bet-1","amount":25,"selections":[]}'
```

## Notes

- The frontend dev server and mock API run independently; start both during development if your features need API data.
