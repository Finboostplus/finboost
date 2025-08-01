export default function StatBox({ number, label, color }) {
  return (
    <div
      className={`flex flex-col justify-center items-center p-4 rounded-2xl shadow bg-opacity-60 min-h-[100px] ${color}`}
    >
      <p className="text-xs uppercase text-muted tracking-wide font-principal">
        {label}
      </p>
      <p className="text-2xl font-bold text-text font-principal">{number}</p>
    </div>
  );
}

export function FavoriteCategory() {
  return (
    <div className="flex flex-col justify-center items-center bg-purple-100 p-4 rounded-2xl shadow min-h-[100px]">
      <p className="text-xs uppercase text-muted tracking-wide font-principal">
        Categoria Favorita
      </p>
      <p className="text-lg font-semibold text-purple-700 font-principal">
        Alimentação
      </p>
    </div>
  );
}
