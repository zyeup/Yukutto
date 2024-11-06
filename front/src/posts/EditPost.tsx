import axios from 'axios';
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
            const response = await axios.get('http://localhost:3000/api/v1/posts');
            setPosts(response.data);
        };

        try {
            await axios.put(`http://localhost:3000/api/v1/posts/${postId}`, {
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
            <h1>編集</h1>
            <form onSubmit={handleSubmit}>
                <label>タイトル</label>
                <input
                    className='block bg-gray-200 appearance-none border-2 border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    type="text"
                    value={title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                <label>本文</label>
                <textarea
                    className='block bg-gray-200 appearance-none border-2 border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                    value={content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
                <button
                    className='block bg-blue-500 hover:bg-blue-700 text-white rounded'
                    type='submit'
                >
                    投稿
                </button>
            </form>
        </>
    )
}

export default EditPost;
