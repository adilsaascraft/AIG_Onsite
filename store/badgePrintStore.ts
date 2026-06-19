import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface BadgePrintSettings {
  // ======================================================
  // QR
  // ======================================================

  qrSize: number
  qrX: number
  qrY: number

  // ======================================================
  // NAME
  // ======================================================

  nameFontSize: number
  nameWeight: number
  nameWidth: number

  nameX: number
  nameY: number

  // ======================================================
  // ACTIONS
  // ======================================================

  setSettings: (data: Partial<BadgePrintSettings>) => void

  resetSettings: () => void
}

export const defaultBadgePrintSettings = {
  // ======================================================
  // QR SETTINGS
  // ======================================================

  qrSize: 140,
  qrX: 0,
  qrY: -40,

  // ======================================================
  // NAME SETTINGS
  // ======================================================

  nameFontSize: 22,
  nameWeight: 700,

  // Controls line wrapping
  nameWidth: 280,

  // Independent positioning
  nameX: 0,
  nameY: 100,
}

export const useBadgePrintStore = create<BadgePrintSettings>()(
  persist(
    (set) => ({
      ...defaultBadgePrintSettings,

      setSettings: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      resetSettings: () => set(defaultBadgePrintSettings),
    }),
    {
      name: 'badge-print-settings',

      version: 1,

      partialize: (state) => ({
        qrSize: state.qrSize,
        qrX: state.qrX,
        qrY: state.qrY,

        nameFontSize: state.nameFontSize,
        nameWeight: state.nameWeight,
        nameWidth: state.nameWidth,

        nameX: state.nameX,
        nameY: state.nameY,
      }),
    },
  ),
)
