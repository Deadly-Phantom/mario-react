// src/App.tsx
import { PhaserGame } from './components/PhaserGame'
import { GameScene } from './game/scenes/GameScene'
import { GameUI } from './components/GameUI'
import { Box } from '@mui/material'
import Phaser from 'phaser'

// Define the game configuration
const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false // Set to true to see physics bodies
    }
  },
  // The scene to start with
  scene: [GameScene],
  backgroundColor: '#000000'
}

function App() {
  return (
    // Use a Box with relative positioning to act as a container
    <Box sx={{ position: 'relative', width: 800, height: 600, margin: 'auto' }}>
      <PhaserGame config={gameConfig} />
      <GameUI />
    </Box>
  )
}

export default App
