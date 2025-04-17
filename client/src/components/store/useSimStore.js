import { create } from 'zustand'

export const useSimStore = create((set) => ({
  grid: [],
  setGrid: (newGrid) => set({ grid: newGrid }),

  target: null,
  setTarget: (pos) => set({ target: pos }),

  robotPos: [0, 0],
  setRobotPos: (pos) => set({ robotPos: pos }),

  mode: 'target',
  setMode: (newMode) => set({ mode: newMode }),

  path: [],
  setPath: (newPath) => set({path: newPath}),

  robotType: 'amr',
  setRobotType: (type) => set({ robotType: type }),

  algorithm: 'astar',
  setAlgorithm: (type) => set({ algorithm: type }),
}))
