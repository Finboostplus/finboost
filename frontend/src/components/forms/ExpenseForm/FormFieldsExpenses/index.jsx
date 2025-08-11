import InputUI from '../../../ui/Input';
import SelectUI from '../../../ui/Select';
import TextareaUI from '../../../ui/Textarea';

const categories = [
  { id: 1, name: 'Alimentação' },
  { id: 2, name: 'Transporte' },
  { id: 3, name: 'Outros' },
];

const users = [
  { id: 1, name: 'Marina', isCurrentUser: true },
  { id: 2, name: 'João' },
];

export default function FormFieldsExpenses() {
  return (
    <div className="flex flex-col h-full w-full overflow-auto p-4">
      <div className="grid gap-4 flex-1">
        {/* Título e Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title_expense"
              className="block text-sm font-semibold text-text mb-1"
            >
              Título
            </label>
            <InputUI
              id="title_expense"
              name="title_expense"
              placeholder="Ex: Jantar com amigos"
              className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="total_amount"
              className="block text-sm font-semibold text-text mb-1"
            >
              Valor
            </label>
            <InputUI
              id="total_amount"
              type="number"
              name="total_amount"
              placeholder="R$ 0,00"
              step="0.01"
              required
              className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            />
          </div>
        </div>

        {/* Data da despesa */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-semibold text-text mb-1"
          >
            Data
          </label>
          <InputUI
            id="date"
            type="date"
            name="date"
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>

        {/* Descrição */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-text mb-1"
          >
            Descrição
          </label>
          <TextareaUI
            id="description"
            name="description"
            placeholder="Ex: Restaurante italiano no centro"
            required
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none h-[150px]"
          />
        </div>

        {/* Categoria */}
        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-semibold text-text mb-1"
          >
            Categoria
          </label>
          <SelectUI
            id="category_id"
            name="category_id"
            required
            options={categories.map(c => ({
              value: c.id.toString(),
              label: c.name,
            }))}
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition cursor-pointer"
          />
        </div>

        {/* Quem pagou */}
        <div>
          <label
            htmlFor="payer_id"
            className="block text-sm font-semibold text-text mb-1"
          >
            Quem pagou?
          </label>
          <SelectUI
            id="payer_id"
            name="payer_id"
            required
            options={users.map(u => ({
              value: u.id.toString(),
              label: u.name + (u.isCurrentUser ? ' (Você)' : ''),
            }))}
            className="w-full p-2 border border-neutral rounded-md text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          />
        </div>
      </div>
    </div>
  );
}
