import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';

import GroupForm from '../../src/components/forms/GroupForm';
import { groupAction } from '../../src/actions/groupAction';

// Mock do customToast para capturar mensagens de erro
vi.mock('../../src/components/CustomToast', () => ({
  customToast: vi.fn(),
}));
import { customToast } from '../../src/components/CustomToast';

describe('GroupForm - Integração com Data Router', () => {
  it('exibe validações de campos (mensagens de erro) via toast quando o nome é inválido', async () => {
    const router = createMemoryRouter([
      { path: '/', element: <GroupForm />, action: groupAction },
    ], { initialEntries: ['/'] });

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    // Preenche um nome inválido (menos de 3 caracteres)
    await user.type(screen.getByLabelText(/nome do grupo/i), 'ab');
    await user.click(screen.getByRole('button', { name: /criar grupo/i }));

    // Toast com título e mensagem do zod
    await waitFor(() => {
      expect(customToast).toHaveBeenCalled();
    });
    const [title, message] = customToast.mock.calls.at(-1).slice(0, 2);
    expect(title).toMatch(/nome do grupo/i);
    expect(message).toMatch(/pelo menos 3 caracteres/i);

    // Botão volta ao estado normal
    expect(screen.getByRole('button', { name: /criar grupo/i })).toBeEnabled();
  });

  it('submete chamando a action com o payload correto', async () => {
    let capturedPayload = null;
    const mockAction = vi.fn(async ({ request }) => {
      const fd = await request.formData();
      capturedPayload = Object.fromEntries(fd);
      return {};
    });

    const router = createMemoryRouter([
      { path: '/', element: <GroupForm />, action: mockAction },
    ], { initialEntries: ['/'] });

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/nome do grupo/i), 'Grupo Família');
    await user.type(screen.getByLabelText(/descrição/i), 'Grupo da família');
    await user.click(screen.getByRole('button', { name: /criar grupo/i }));

    await waitFor(() => expect(mockAction).toHaveBeenCalled());
    expect(capturedPayload).toEqual({
      name: 'Grupo Família',
      description: 'Grupo da família',
    });
  });

  it('mostra loading/disabled durante submit e trata erro da API com toast', async () => {
    const mockAction = vi.fn(() =>
      new Promise(resolve => {
        setTimeout(() =>
          resolve({
            errors: {
              name: {
                title: 'Nome do grupo',
                message: 'Erro da API ao criar grupo',
              },
            },
          }), 50);
      })
    );

    const router = createMemoryRouter([
      { path: '/', element: <GroupForm />, action: mockAction },
    ], { initialEntries: ['/'] });

    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    await user.type(screen.getByLabelText(/nome do grupo/i), 'Qualquer');
    const submitBtn = screen.getByRole('button', { name: /criar grupo/i });
    await user.click(submitBtn);

    // Durante submit: o botão deve ficar desabilitado
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });

    // Após operação: volta ao normal e toast de erro é chamado
    await waitFor(() => {
      expect(customToast).toHaveBeenCalled();
      expect(screen.getByRole('button', { name: /criar grupo/i })).toBeEnabled();
    });

    const [title, message] = customToast.mock.calls.at(-1).slice(0, 2);
    expect(title).toMatch(/nome do grupo/i);
    expect(message).toMatch(/erro da api/i);
  });
});
