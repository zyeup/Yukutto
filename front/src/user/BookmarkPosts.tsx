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
    <div className="p-6 bg-gray-100 shadow-lg rounded-xl max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        ブックマークした投稿
      </h2>
      <div className="grid grid-cols-1 gap-6 max-h-[680px] overflow-y-scroll">
        {bookmarkedPosts.map((post) => (
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
            <div className="flex justify-end space-x-3">
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookmarkPosts
