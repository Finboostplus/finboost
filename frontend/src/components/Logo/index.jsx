import { useAtomValue } from 'jotai';
import { themeAtom } from '../../context/atoms/themeApp.atoms';

export default function LogoImage({ className }) {
  const logo =
    useAtomValue(themeAtom) === 'dark' ? '/dark_mode_logo.png' : '/logo.png';

  return (
    <div className="flex flex-col">
      <img src={logo} alt="Logo" className={className} />
      <p className="text-[0.7rem] ml-4 text-muted italic font-principal">
        Controle seus gastos de forma simples e compartilhada
      </p>
    </div>
  );
}
