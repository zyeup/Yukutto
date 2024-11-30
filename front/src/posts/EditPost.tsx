import api from '../api/axios';
import React, { Dispatch, SetStateAction, ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";

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


const EditPost: React.FC<PostProps> = ({ posts, setPosts }) => {

    const { postId } = useParams<{ postId: string }>();
    const post = postId ? Object.values(posts).find((post) => String(post.id) === postId) : undefined;

    const [title, setTitle] = useState(post ? post.title : "投稿が見つかりません");
    const [content, setContent] = useState(post ? post.content : "投稿が見つかりません");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const fetchPosts = async () => {
            const response = await api.get('/posts');
            setPosts(response.data);
        };

        try {
            await api.put(`/posts/${postId}`, {
                title: title,
                content: content
            })
            await fetchPosts();
            navigate("/");

        } catch (err) {

            alert("編集に失敗しました")
        }
    }

    return (
        <>
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">編集</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                    className="block text-gray-700 font-medium mb-2"
                    htmlFor="title"
                    >
                    タイトル
                    </label>
                    <input
                        className="w-full bg-gray-100 border-2 border-gray-300 rounded py-2 px-4 text-gray-800 focus:outline-none focus:bg-white focus:border-blue-500"
                        type="text"
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    </div>

                    <div className="mb-6">
                        <label
                        className="block text-gray-700 font-medium mb-2"
                        >
                        本文
                        </label>
                        <textarea
                            className="w-full bg-gray-100 border-2 border-gray-300 rounded py-2 px-4 text-gray-800 focus:outline-none focus:bg-white focus:border-blue-500"
                            value={content}
                            rows={5}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                            type='submit'
                        >
                            投稿
                        </button>
                    </div>

            </form>
        </div>
        </>
    )
}

export default EditPost;
