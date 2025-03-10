import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../App"
import api from '../api/axios';

const POSTS_PER_PAGE = 10;

const Home = () => {
    const { posts } = useContext(AuthContext)
    const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});
    const [currentPage, setCurrentPage] = useState(1);

    const sortedPosts = posts.sort((a, b) => b.id - a.id);
    const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = sortedPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await api.get('/post_bookmarks');
                const userBookmarks = response.data.bookmarks.reduce((acc: ({ [key: number]: boolean }), postId: number) => {
                    acc[postId] = true;
                    return acc;
                }, {});
                setBookmarks(userBookmarks);
            } catch (err) {
                console.error("Error fetching bookmarks", err);
            }
        };

        fetchBookmarks();
    }, []);

    const handleBookmarkChange = async (e: React.ChangeEvent<HTMLInputElement>, postId: number) => {
        const newIsBookmarked = e.target.checked;
        setBookmarks(prevBookmarks => ({ ...prevBookmarks, [postId]: newIsBookmarked }));

        try {
            if (newIsBookmarked) {
                // ブックマークを追加
                await api.post('/post_bookmarks', { post_id: postId });
            } else {
                // ブックマークを削除
                await api.delete(`/post_bookmarks/${postId}`);
            }
        } catch (err) {
            console.error(err);
            // エラーの場合は元に戻す
            setBookmarks(prevBookmarks => ({ ...prevBookmarks, [postId]: !newIsBookmarked }));
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8 relative pt-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    投稿一覧
                </h2>
                <div className="max-h-[500px] overflow-y-auto space-y-4 px-4">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="bg-white shadow-lg p-5 rounded-lg border border-gray-300 flex items-center justify-between transition hover:shadow-xl">
                            <div>
                                <Link to={`/posts/${post.id}`} className="text-lg font-semibold text-gray-800 hover:text-indigo-600">
                                    {post.title}
                                </Link>
                                <p className="text-gray-500 text-sm">作成日時: {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-500 text-sm">作成者　: {post.user ? post.user.name : 'ユーザー情報なし'}</p>
                            </div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    id={`bookmark-checkbox-${post.id}`}
                                    data-testid={`bookmark-checkbox-${post.id}`}
                                    type="checkbox"
                                    checked={bookmarks[post.id] || false}
                                    onChange={(e) => handleBookmarkChange(e, post.id)}
                                    className="hidden"
                                />
                                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${bookmarks[post.id] ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-gray-400 text-gray-400"} transition-all`} data-testid={`star-icon-${post.id}`}>
                                    ★
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg transition ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                        >
                            ← 前へ
                        </button>
                        <span className="px-4 py-2 bg-gray-200 rounded-lg">{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg transition ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
                        >
                            次へ →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Home;
