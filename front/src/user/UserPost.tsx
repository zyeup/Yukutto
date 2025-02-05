import { useContext } from "react";
import { useParams } from "react-router-dom";
import EditMap from '../map_components/EditMap';
import { AuthContext } from "../App"

const UserPost = () => {
  const { posts } = useContext(AuthContext)
  const { paramsId } = useParams<{ paramsId: string }>();
  const postId = parseInt(paramsId || "0");
  const post = postId ? posts.find((post) => post.id === postId) : undefined;

  return (
    <div className="p-6 bg-white shadow-md rounded-md mx-auto">
      {post ? (
        <>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">{post.title}</h1>
            <p className="text-xl font-semibold text-gray-900">{post.content}</p>
          </div>
        </>
      ) : (
        <h1 className="text-xl font-bold text-red-600 text-center">Post not found</h1>
      )}
      <div className="mt-6">
        <EditMap postId={postId} />
      </div>
    </div>

  )
}

export default UserPost;
