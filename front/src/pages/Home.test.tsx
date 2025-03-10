import '@testing-library/jest-dom';
import { PostData } from '../interfaces/index';
import { User } from '../interfaces/index';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';
import { AuthContext } from '../App';

const dummyPosts: PostData[] = [
  {
    id: 1,
    title: "Test Post 1",
    content: "Content for post 1",
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    userId: 1,
    user: { name: "Alice" }
  },
  {
    id: 2,
    title: "Test Post 2",
    content: "Content for post 2",
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
    userId: 2,
    user: { name: "Bob" }
  }
];

// 多くの投稿がある場合のダミーデータ（15件）
const dummyPostsLarge: PostData[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `Test Post ${i + 1}`,
  content: `Content for post ${i + 1}`,
  createdAt: new Date().toISOString(),
  updateAt: new Date().toISOString(),
  userId: (i % 2) + 1,
  user: { name: i % 2 === 0 ? "Alice" : "Bob" }
}));

vi.mock('../api/axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: { bookmarks: [] }
    }),
    post: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({})
  }
}));

const noop = () => { };

const authContextValue = {
  posts: dummyPosts,
  setPosts: noop,
  loading: false,
  setLoading: noop,
  isSignedIn: true,
  setIsSignedIn: noop,
  currentUser: { id: 1, name: "Alice", email: "alice@example.com" } as User,
  setCurrentUser: noop,
};

describe('Home Component', () => {
  it('ホーム画面と投稿の表示', async () => {
    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('投稿一覧')).toBeInTheDocument();
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  // it('ブックマーク', async () => {
  //   render(
  //     <AuthContext.Provider value={authContextValue}>
  //       <MemoryRouter>
  //         <Home />
  //       </MemoryRouter>
  //     </AuthContext.Provider>
  //   );

  //   await waitFor(() => expect(screen.getByText('Test Post 1')).toBeInTheDocument());

  //   const checkboxes = screen.getAllByRole('checkbox');
  //   // 最初のチェックボックスをオンにする
  //   fireEvent.change(checkboxes[0], { target: { checked: true } });
  //   const starDiv = checkboxes[0].parentElement?.querySelector('div');

  //   // ブックマークオンの場合、クラスに bg-indigo-600 が含まれる
  //   await waitFor(() => {
  //     expect(starDiv).toHaveClass('bg-indigo-600');
  //   });
  // });

  it('ページネーション', async () => {
    // ページネーションテスト用に投稿データを上書き
    const authContextValueLarge = { ...authContextValue, posts: dummyPostsLarge };

    render(
      <AuthContext.Provider value={authContextValueLarge}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // 初期状態で "1 / 2" が表示される
    await waitFor(() => {
      expect(screen.getByText(/1 \/ 2/)).toBeInTheDocument();
    });

    // 次のページへ
    const nextButton = screen.getByText(/次へ →/);
    fireEvent.click(nextButton);

    // ページ番号が "2 / 2" になる
    await waitFor(() => {
      expect(screen.getByText(/2 \/ 2/)).toBeInTheDocument();
    });
  });
});
