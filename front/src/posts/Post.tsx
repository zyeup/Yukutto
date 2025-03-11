import { useParams } from "react-router-dom";
import Map from '../map_components/Map';
import { useContext, useState } from 'react';
import { AuthContext } from "../App"

const Post = () => {
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
                <div className="absolute top-20 left-4 z-20">
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
                        <p>作成日時: {new Date(post.createdAt).toLocaleDateString()}</p>
                        <p>作成者　: {post.user ? post.user.name : 'ユーザー情報なし'}</p>
                        <p className="text-lg text-gray-900">{post.content}</p>
                    </div>
                </div>
            )}
            {!post && (
                <h1 className="text-xl font-bold text-red-600 text-center">投稿が見つかりません</h1>
            )}
            <Map postId={postId} createUserId={createUserId} />
        </div>
    );
};

export default Post;
