// src/components/GameUI.tsx
import { Box, Typography } from '@mui/material'
import { useGameStore } from '@renderer/store/useGameStore'

export const GameUI = () => {
  // Use the hook to subscribe to state changes
  const score = useGameStore((state) => state.score)
  const lives = useGameStore((state) => state.lives)

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        pointerEvents: 'none' // Allow clicks to pass through to the game canvas
      }}
    >
      <Typography variant="h5" color="white" sx={{ textShadow: '2px 2px 4px #000000' }}>
        Score: {score}
      </Typography>
      <Typography variant="h5" color="white" sx={{ textShadow: '2px 2px 4px #000000' }}>
        Lives: {lives}
      </Typography>
    </Box>
  )
}
