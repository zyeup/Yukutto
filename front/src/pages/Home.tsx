import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../App"
import api from '../api/axios';

const Home = () => {
    const { posts } = useContext(AuthContext)
    const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});

    const sortedPosts = posts.sort((a, b) => a.id - b.id);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await api.get('/user_bookmarks');
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
        <div className="p-6 bg-gray-100 shadow-lg rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Home
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                <Link to="/posts/new" className="text-blue-500 hover:text-blue-600 hover:underline font-semibold">
                    新しく地図を作成する
                </Link>
            </p>
            <div className="grid grid-cols-1 gap-6 max-h-[600px] overflow-y-scroll">
                {sortedPosts.map((post) => (
                    <div
                        key={post.id}
                        className="block p-6 h-32 bg-white shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
                    >
                        <Link
                            to={`/posts/${post.id}`}
                            className="mb-4 text-xl font-bold text-gray-700"
                        >
                            {post.id}: {post.title}
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">
                            Created at: {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        <label
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            htmlFor={`bookmark-checkbox-${post.id}`}
                        >
                            <input
                                id={`bookmark-checkbox-${post.id}`}
                                type="checkbox"
                                checked={bookmarks[post.id] || false}
                                onChange={(e) => handleBookmarkChange(e, post.id)}
                            />
                            ブックマーク
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
