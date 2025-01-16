import React from "react";
import { useParams } from "react-router-dom";
import Map from '../map_components/Map';
import { PostData } from "../interfaces/index"

interface PostProps {
    posts: PostData[];
}

const Post: React.FC<PostProps> = ({ posts }) => {

    const { ParamsId } = useParams<{ ParamsId: string }>();
    const postId = parseInt(ParamsId || "0");
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
                <Map postId={postId} />
            </div>
        </div>

    )
}

export default Post;
