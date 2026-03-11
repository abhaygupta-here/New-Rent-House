import { create } from 'zustand';

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  theme: localStorage.getItem('theme') || 'light',
  properties: [],
  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },
  setProperties: (properties) => set({ properties }),
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  }
}));

export default useStore;
