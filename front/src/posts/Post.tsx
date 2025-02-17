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

    const [isOpen, setIsOpen] = useState(false); // モーダルの開閉状態

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="relative w-full h-screen">
            {/* 投稿詳細を開くボタン */}
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

            {/* モーダル */}
            {isOpen && post && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* 背景のグレーオーバーレイ */}
                    <div
                        className="absolute inset-0 bg-gray-800 opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* モーダル本体 */}
                    <div className="relative z-50 bg-white p-6 shadow-lg rounded-lg w-full max-w-2xl">
                        {/* 閉じるボタン */}
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">{post.title}</h1>
                        <p className="text-lg text-gray-900">{post.content}</p>
                    </div>
                </div>
            )}

            {/* 投稿がない場合の表示 */}
            {!post && (
                <h1 className="text-4xl font-bold text-black text-center">すべてのマーカー</h1>
            )}

            {/* マップ */}
            <Map postId={postId} createUserId={createUserId} />
        </div>
    );
};

export default Post;
