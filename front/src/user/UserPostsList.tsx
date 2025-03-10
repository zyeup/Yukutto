import api from '../api/axios';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../App"

const UserPostsList = () => {
  const { posts, setPosts } = useContext(AuthContext)
  const { paramsId = "0" } = useParams<{ paramsId: string }>();

  const sortedPosts = posts.sort((a, b) => a.id - b.id);
  const fillterdPosts = sortedPosts.filter(post => post.userId === +paramsId)

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl p-8 relative pt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          投稿したポスト一覧
        </h2>
        <div className="max-h-[500px] overflow-y-auto space-y-4 px-4">
          {fillterdPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg p-5 rounded-lg border border-gray-300 flex items-center justify-between transition hover:shadow-xl">
              <div>
                <Link to={`/userposts/${post.id}`} className="text-lg font-semibold text-gray-800 hover:text-indigo-600">
                  {post.title}
                </Link>
                <p className="text-gray-500 text-sm">作成日時: {new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm">作成者　: {post.user ? post.user.name : 'ユーザー情報なし'}</p>
              </div>
              <div className="flex justify-end space-x-3">
                <Link to={`/posts/edit/${post.id}`} onClick={(e) => e.stopPropagation()}>
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
    </div>
  )
}

export default UserPostsList;
