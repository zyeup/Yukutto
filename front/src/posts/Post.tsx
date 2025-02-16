import { useParams } from "react-router-dom";
import Map from '../map_components/Map';
import { useContext, useState } from 'react';
import { AuthContext } from "../App"

const Post = () => {
    const { posts } = useContext(AuthContext)
    const { paramsId } = useParams<{ paramsId: string }>();
    const postId = parseInt(paramsId || "0");
    const post = postId ? posts.find((post) => post.id === postId) : undefined;
    const createUserId = post?.userId ? post.userId : undefined;
    const [isUserPost,] = useState(false);

    return (
        <div className="">
            {post ? (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">{post.title}</h1>
                    <p className="text-xl font-semibold text-gray-900">{post.content}</p>
                </>
            ) : (
                <h1 className="text-4xl font-bold text-black text-center">すべてのマーカー</h1>
            )}
            <Map postId={postId} createUserId={createUserId} isUserPost={isUserPost} />
        </div>

    )
}

export default Post;
