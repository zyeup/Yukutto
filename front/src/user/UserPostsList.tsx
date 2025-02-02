import api from '../api/axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../App"

const UserPostsList = () => {
  const { posts, setPosts, currentUser } = useContext(AuthContext)

  const sortedPosts = posts.sort((a, b) => a.id - b.id);
  const fillterdPosts = sortedPosts.filter(post => post.user_id === currentUser?.id)

  const handleDelete = async (postId: number) => {
    const confirm = window.confirm("このリストを削除します。\n本当によろしいですか？");
    if (confirm) {
      try {
        await api.delete(`/posts/${postId}`);
        const newArray = [...posts].filter(post => post.id !== postId);
        setPosts([...newArray]);
      } catch (err) {
        alert("削除に失敗しました");
        console.log(err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-xl max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        投稿したポスト一覧
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        <Link to="/posts/new" className="text-blue-500 hover:text-blue-600 hover:underline font-semibold">
          新しく地図を作成する
        </Link>
      </p>
      <div className="grid grid-cols-1 gap-6 max-h-[680px] overflow-y-scroll">
        {fillterdPosts.map((post) => (
          <div
            key={post.id}
            className="block p-6 h-32 bg-white shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
          >
            <Link
              to={`/userposts/${post.id}`}
              className="mb-4 text-xl font-bold text-gray-700"
            >
              {post.id}: {post.title}
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Created at: {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="flex justify-end space-x-3">
              <Link
                to={`/posts/edit/${post.id}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Edit
                </button>
              </Link>
              <button
                onClick={(e) => {
                  handleDelete(post.id);
                  e.preventDefault();
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPostsList;
