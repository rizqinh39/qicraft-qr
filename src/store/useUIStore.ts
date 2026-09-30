import { create } from 'zustand';
import { Locale } from '../i18n/types';

export type AppView = 'studio' | 'templates' | 'how-it-works';

interface UIState {
  locale: Locale;
  theme: 'dark' | 'light';
  activeView: AppView;
  toastMessage: string | null;
  setLocale: (locale: Locale) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setActiveView: (view: AppView) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
}

const getInitialLocale = (): Locale => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage) {
      const saved = localStorage.getItem('qicraft_locale') as Locale;
      if (saved === 'en' || saved === 'id') return saved;
    }
  } catch {
    // Ignore storage errors in non-browser envs
  }
  return 'id'; // Default to Indonesian
};

const getInitialTheme = (): 'dark' | 'light' => {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined' && localStorage) {
      const saved = localStorage.getItem('qicraft_theme') as 'dark' | 'light';
      if (saved === 'dark' || saved === 'light') return saved;
    }
  } catch {
    // Ignore storage errors
  }
  return 'dark';
};

export const useUIStore = create<UIState>((set) => ({
  locale: getInitialLocale(),
  theme: getInitialTheme(),
  activeView: 'studio',
  toastMessage: null,

  setLocale: (locale) => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.setItem('qicraft_locale', locale);
      }
    } catch {}
    set({ locale });
  },

  setTheme: (theme) => {
    try {
      if (typeof localStorage !== 'undefined' && localStorage) {
        localStorage.setItem('qicraft_theme', theme);
      }
    } catch {}
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme });
  },

  setActiveView: (activeView) => set({ activeView }),

  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3000);
  },

  clearToast: () => set({ toastMessage: null }),
}));
