import { useParams } from "react-router-dom";
import Map from '../map_components/Map';
import { useContext, useState } from 'react';
import { AuthContext } from "../App"

const Post = () => {
    const { posts } = useContext(AuthContext)
    const { paramsId } = useParams<{ paramsId: string }>();
    const postId = parseInt(paramsId || "0");
    const post = postId ? posts.find((post) => post.id === postId) : undefined;
    const userId = post?.user_id ? post.user_id : undefined;
    const [isUserPost,] = useState(false);

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
                <Map postId={postId} userId={userId} isUserPost={isUserPost} />
            </div>
        </div>

    )
}

export default Post;
