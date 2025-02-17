import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Map from '../map_components/Map';
import { AuthContext } from "../App";

const UserPost = () => {
  const { posts } = useContext(AuthContext);
  const { paramsId } = useParams<{ paramsId: string }>();
  const postId = parseInt(paramsId || "0", 10);
  const post = postId ? posts.find((post) => post.id === postId) : undefined;
  const createUserId = post?.userId ? post.userId : undefined;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="relative w-full h-screen">
      {post && (
        <div className="absolute top-14 left-4 z-20">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            投稿の詳細を見る
          </button>
        </div>
      )}

      {isOpen && post && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-800 opacity-50"
            onClick={closeModal}
          ></div>
          <div className="relative z-50 bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              ✖
            </button>
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">{post.title}</h1>
            <p className="text-lg text-gray-900">{post.content}</p>
          </div>
        </div>
      )}

      {!post && (
        <h1 className="text-xl font-bold text-red-600 text-center">Post not found</h1>
      )}

      <div className="mt-6">
        <Map postId={postId} createUserId={createUserId} />
      </div>
    </div>
  );
};

export default UserPost;
