import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const KEY = 'app_theme';

// Inicializa e aplica o tema
const init = () => {
  const theme = localStorage?.getItem(KEY) || 'light';
  document.documentElement.className = theme.trim().replace(/"/g, '');
  return theme;
};

export const themeAtom = atomWithStorage(KEY, init());
export const enabledAtom = atom(get => get(themeAtom) === 'dark');
export const toggleThemeAtom = atom(null, (get, set) => {
  const newTheme = get(themeAtom) === 'light' ? 'dark' : 'light';
  set(themeAtom, newTheme);
  document.documentElement.className = newTheme;
});
