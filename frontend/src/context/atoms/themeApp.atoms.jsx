import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const KEY = 'app_theme';

// Tema padrão: 'light' (não precisa ler do localStorage manualmente)
export const themeAtom = atomWithStorage(KEY, 'light');

// Atualiza a classe do HTML quando o tema muda
themeAtom.onMount = () => {
  const theme = localStorage.getItem(KEY); // Jotai já gerencia isso
  document.documentElement.className = JSON.parse(theme) || 'light';
};

export const enabledAtom = atom(get => get(themeAtom) === 'dark');
export const toggleThemeAtom = atom(null, (get, set) => {
  const newTheme = get(themeAtom) === 'light' ? 'dark' : 'light';
  set(themeAtom, newTheme);
  document.documentElement.className = newTheme;
});
