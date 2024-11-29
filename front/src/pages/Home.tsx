import api from '../api/axios';
import { Link } from 'react-router-dom';
import React, { Dispatch, SetStateAction } from 'react'

type PostData = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    update_at: string;
}

type PostProps = {
    posts: PostData[];
    setPosts: Dispatch<SetStateAction<PostData[]>>;
}

const Home: React.FC<PostProps> = ({ posts, setPosts }) => {

    const handleDelete = async (postId: number) => {
        try {
            await api.delete(`/posts/${postId}`);
            const newArray = [...posts].filter(post => {
                return post.id !== postId;
            })
            setPosts([...newArray]);

        } catch (err) {
            alert("削除に失敗しました")
            console.log(err);

        }
    }

    const sortedPosts = posts.sort((a, b) => a.id - b.id);

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-red-700 mb-4">
            ここはHome画面です!!
        </h2>
        <p className="text-gray-700 mb-6">
            新規作成は{" "}
            <Link to="/create_posts" className="text-blue-600 hover:underline font-medium">
            こちら
            </Link>
        </p>
        <div className="space-y-6">
            {sortedPosts.map((post) => (
            <div
                key={post.id}
                className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
                <Link
                to={`/posts/${post.id}`}
                className="text-lg font-semibold text-gray-900 hover:underline"
                >
                {post.id}: {post.title}
                </Link>
                <div className="mt-4 flex gap-4">
                <Link to={`/edit_posts/${post.id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200">
                    Edit
                    </button>
                </Link>
                <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors duration-200"
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>

    );
};

export default Home;
