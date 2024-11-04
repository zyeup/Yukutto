import React from "react";
import { useParams } from "react-router-dom";
import Map from '../pages/Map';

interface PostData {
    id: string;
    title: string;
    content: string;
    created_at: string;
    update_at: string;
}

interface PostProps {
    posts: PostData[];
}

const Post: React.FC<PostProps> = ({ posts }) => {

    const { postId } = useParams<{ postId: string }>();
    const post = postId ? posts.find((post) => post.id === postId) : undefined;

    return (
        <div>
            {post ? (
                <>
                    <h2 className='text-2xl px-4 py-2'>{post.id}番目のポストの詳細</h2>
                    <div>
                        <h1 className="px-4 mt-4">{post.title}</h1>
                        <p className="px-4">{post.content}</p>
                    </div>
                </>
            ) : (
                <h1>Post not found</h1>
            )}
            <Map></Map>
        </div>
    )
}

export default Post;
