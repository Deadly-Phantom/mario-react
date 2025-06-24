// src/components/PhaserGame.tsx
import Phaser from 'phaser'
import { forwardRef, useLayoutEffect, useRef } from 'react'

// This is the core interface for our Game component
export interface IPhaserGame extends React.HTMLAttributes<HTMLDivElement> {
  config: Phaser.Types.Core.GameConfig
  // Allows the parent to get a reference to the game instance
  gameRef?: React.Ref<Phaser.Game | undefined>
}

export const PhaserGame = forwardRef<HTMLDivElement, IPhaserGame>(
  ({ config, gameRef, ...props }, ref) => {
    const game = useRef<Phaser.Game | undefined>(undefined)

    // Use useLayoutEffect to create the game before the browser paints
    useLayoutEffect(() => {
      if (game.current) {
        return // Already initialized
      }

      // Create the Phaser game instance
      game.current = new Phaser.Game({ ...config, parent: 'game-container' })

      // Expose the game instance through the ref
      if (gameRef) {
        if (typeof gameRef === 'function') {
          gameRef(game.current)
        } else {
          gameRef.current = game.current
        }
      }

      // Cleanup on unmount
      return () => {
        game.current?.destroy(true)
        game.current = undefined
      }
    }, [config, gameRef])

    return <div id="game-container" ref={ref} {...props} />
  }
)
