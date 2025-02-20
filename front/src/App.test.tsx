import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import App from './App';
import { MemoryRouter } from 'react-router-dom';


vi.mock('./api/axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [{ id: 1, title: "Post", content: "Test", createdAt: new Date().toISOString(), updateAt: new Date().toISOString(), userId: 1, user: { name: "Alice" } }] })
  }
}));

vi.mock('./api/auth', () => ({
  getCurrentUser: vi.fn().mockResolvedValue({ data: { isLogin: true, data: { id: 1, name: "Alice", email: "alice@example.com" } } })
}));

describe('App Component', () => {
  it('renders LoadingSpinner initially and then Header and AppRoutes', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // 初期状態ではLoadingSpinner が表示される
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // 非同期処理が完了して、Homeが表示される
    await waitFor(() => expect(screen.getByText('Home')).toBeInTheDocument());


  });
});
