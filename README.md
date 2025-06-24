# Mario React-Phaser 🍄

A proof-of-concept classic platformer game built with a modern hybrid stack, combining the power of React for the UI and Phaser for the core game engine. This project is bundled into a cross-platform desktop app using Electron and Vite (via the `vitron` scaffold).

![CI/CD Status](https://github.com/<your-username>/<your-repo-name>/actions/workflows/create-app-release.yml/badge.svg)
![Web Deploy Status](https://github.com/<your-username>/<your-repo-name>/actions/workflows/create-web-release.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.0.1-brightgreen)

<!--
TODO: Add a screenshot or GIF of your game here! It's the best way to show it off.
![Game Screenshot](./path/to/your/screenshot.gif)
-->

## ✨ Features (v0.0.1)

- **React + Phaser Hybrid:** Renders a Phaser 3 game canvas inside a React component.
- **Desktop & Web:** Runs as a standalone desktop application (Windows, macOS, Linux) and as a web app.
- **Player Controls:** Basic character movement (left, right) and jumping.
- **Simple Physics:** Implements arcade physics for gravity and platform collisions.
- **Collectibles:** Collect coins scattered throughout the level.
- **Real-time UI:** A Heads-Up Display (HUD) built with React and MUI that updates the score in real-time.
- **State-Management Bridge:** Uses Zustand to seamlessly communicate between the Phaser game world and the React UI.

## 🛠️ Tech Stack

- **Game Engine:** [Phaser 3](https://phaser.io/)
- **UI & Component-Logic:** [React](https://reactjs.org/)
- **Desktop Shell:** [Electron](https://www.electronjs.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **UI Library:** [Material-UI (MUI)](https://mui.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

The project maintains a clean separation of concerns between the game logic and the UI logic.

```
src
├── components/ # React components (PhaserGame.tsx, GameUI.tsx)
├── game/ # All Phaser-related code
│ └── scenes/ # Phaser Scenes (e.g., GameScene.ts)
├── stores/ # Zustand state stores (e.g., useGameStore.ts)
├── App.tsx # Main React application component
└── main.tsx # React entry point
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/<your-username>/<your-repo-name>.git
    cd <your-repo-name>
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

## 📜 Available Scripts

### Development

To run the app in development mode with hot-reloading for both the Electron main process and the React renderer:

```bash
yarn dev
```

## Build for Web

To build a static version of the app for web deployment (e.g., to GitHub Pages):

```
yarn build
```

The output will be in the dist/renderer directory.

## Build for Desktop

To package the application for the current operating system (Windows, macOS, or Linux):

```
yarn dist
```

The distributable files (e.g., .exe, .dmg, .AppImage) will be created in the dist directory.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

**Important:** Remember to replace the following placeholders in the file:

- `<your-username>`: Your GitHub username.
- `<your-repo-name>`: The name of this repository.

Let me know if this format works better for you
