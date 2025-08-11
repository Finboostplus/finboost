import { Switch } from '@headlessui/react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  enabledAtom,
  toggleThemeAtom,
} from '../../../../../context/atoms/themeApp.atoms';

export default function SwitchTheme() {
  const enabled = useAtomValue(enabledAtom);
  const toggleTheme = useSetAtom(toggleThemeAtom);

  return (
    <Switch
      checked={enabled}
      onChange={toggleTheme}
      className={`group relative inline-flex h-8 w-16 items-center rounded-full ${
        enabled ? 'bg-zinc-600' : 'bg-zinc-200'
      } transition-colors duration-300 focus:outline-none`}
      aria-label="Alternar tema escuro/claro"
    >
      <span
        className={`size-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? 'translate-x-9' : 'translate-x-1'
        }`}
      />
    </Switch>
  );
}
