import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export default function LogoImage({ className }) {
  const { theme } = useContext(ThemeContext);
  const img = theme === 'dark' ? '/dark_mode_logo.png' : '/logo.png';

  return (
    <div>
      <img src={img} alt="Logo da Finboostplus" className={className} />
      <p
        className="text-[0.7rem] ml-4 text-muted italic font-principal"
        aria-label="Slogan"
      >
        Controle seus gastos de forma simples e compartilhada
      </p>
    </div>
  );
}
