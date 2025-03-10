import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from "../App"
import { Link } from 'react-router-dom';

const BookmarkPosts = () => {
  const { posts } = useContext(AuthContext)
  const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});

  const sortedPosts = posts.sort((a, b) => a.id - b.id);

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
        await api.post('/post_bookmarks', { post_id: postId });
      } else {

        await api.delete(`/post_bookmarks/${postId}`);
      }
    } catch (err) {
      console.error(err);
      setBookmarks(prevBookmarks => ({ ...prevBookmarks, [postId]: !newIsBookmarked }));
    }
  };

  const bookmarkedPosts = sortedPosts.filter(post => bookmarks[post.id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8 relative pt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          ブックマークした投稿
        </h2>
        <div className="max-h-[500px] overflow-y-auto space-y-4 px-4">
          {bookmarkedPosts.map((post) => (
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
      </div>
    </div>
  )
}

export default BookmarkPosts
