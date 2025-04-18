import api from '../api/axios';
import { ChangeEvent, FormEvent, useState, useContext } from 'react'
import { AuthContext } from "../App"
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { posts, setPosts, currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/posts", {
                title: title,
                content: content,
                userId: currentUser?.id
            })

            const newPost = {
                id: response.data.id,
                title: title,
                content: content,
                createdAt: response.data.createdAt,
                updateAt: response.data.updateAt,
                userId: currentUser?.id,
                user: {
                    name: currentUser?.name
                }
            }
            setPosts([...posts, newPost]);
            navigate(`/userposts/${newPost.id}`);

        } catch (err) {
            alert("投稿に失敗しました")
        }
    }

    return (
        <>
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-20">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">新規投稿</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="title"
                        >
                            タイトル(30文字以内)
                        </label>
                        <input
                            id="title"
                            className="w-full bg-gray-100 border-2 border-gray-300 rounded py-2 px-4 text-gray-800 focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text"
                            placeholder="タイトルを入力"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            className="block text-gray-700 font-medium mb-2"
                            htmlFor="content"
                        >
                            本文(400文字以内)
                        </label>
                        <textarea
                            id="content"
                            className="w-full bg-gray-100 border-2 border-gray-300 rounded py-2 px-4 text-gray-800 focus:outline-none focus:bg-white focus:border-blue-500"
                            placeholder="本文を入力"
                            rows={15}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        投稿
                    </button>
                </form>
            </div>
        </>

    )
}

export default CreatePost
