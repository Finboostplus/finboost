import InputUI from '../../../components/ui/Input';

export default function FormFieldsExpenses() {
  return (
    <>
      {/* Título */}
      <div className="mb-4">
        <label
          htmlFor="titulo"
          className="block text-sm font-semibold text-text mb-1"
        >
          Título
        </label>
        <InputUI
          id="titulo"
          type="text"
          name="titulo"
          className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="Ex: Jantar no restaurante"
          required
          aria-required="true"
        />
      </div>

      {/* Valor */}
      <div className="mb-4">
        <label
          htmlFor="valor"
          className="block text-sm font-semibold text-text mb-1"
        >
          Valor
        </label>
        <InputUI
          id="valor"
          type="number"
          name="valor"
          className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          placeholder="R$ 0,00"
          step="0.01"
          required
          aria-required="true"
        />
      </div>

      {/* Grupo */}
      <div className="mb-4">
        <label
          htmlFor="grupo"
          className="block text-sm font-semibold text-text mb-1"
        >
          Grupo
        </label>
        <InputUI
          id="grupo"
          name="grupo"
          className="w-full p-2 border border-neutral rounded-md text-text bg-neutral cursor-not-allowed select-none opacity-80"
          readOnly={true}
          aria-readonly="true"
        />
      </div>

      {/* Categoria */}
      <div className="mb-4">
        <label
          htmlFor="categoria"
          className="block text-sm font-semibold text-text mb-1"
        >
          Categoria
        </label>
        <select
          id="categoria"
          name="categoria"
          className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          aria-required="true"
          defaultValue="Alimentação"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Quem pagou */}
      <div className="mb-4 col-span-2">
        <label
          htmlFor="quemPagou"
          className="block text-sm font-semibold text-text mb-1"
        >
          Quem pagou?
        </label>
        <select
          id="quemPagou"
          name="quemPagou"
          className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          aria-required="true"
          defaultValue="Marina (Eu)"
        >
          <option value="Marina (Eu)">Marina (Eu)</option>
          <option value="João">João</option>
        </select>
      </div>
    </>
  );
}
