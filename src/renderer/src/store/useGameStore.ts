// src/stores/useGameStore.ts
import { create } from 'zustand';

interface GameState {
  score: number;
  lives: number;
  isGameOver: boolean;
  actions: {
    incrementScore: (amount: number) => void;
    decrementLives: () => void;
    resetGame: () => void;
  };
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  lives: 3,
  isGameOver: false,
  actions: {
    incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
    decrementLives: () =>
      set((state) => ({
        lives: state.lives - 1,
        isGameOver: state.lives - 1 <= 0,
      })),
    resetGame: () => set({ score: 0, lives: 3, isGameOver: false }),
  },
}));

// Export actions for non-React access (inside Phaser)
export const gameStoreActions = useGameStore.getState().actions;