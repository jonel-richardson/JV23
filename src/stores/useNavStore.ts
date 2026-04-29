import { create } from 'zustand'

interface NavState {
  isMobileMenuOpen: boolean
  scrollY: number
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  setScrollY: (y: number) => void
}

export const useNavStore = create<NavState>((set) => ({
  isMobileMenuOpen: false,
  scrollY: 0,
  openMenu: () => set({ isMobileMenuOpen: true }),
  closeMenu: () => set({ isMobileMenuOpen: false }),
  toggleMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  setScrollY: (y) => set({ scrollY: y }),
}))
