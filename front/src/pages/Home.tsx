import { Link } from 'react-router-dom';
import React from 'react';
import { PostProps } from "../interfaces/index"

const Home: React.FC<PostProps> = ({ posts }) => {

    const sortedPosts = posts.sort((a, b) => a.id - b.id);

    return (
        <div className="p-6 bg-gray-100 shadow-lg rounded-xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Home
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                <Link to="/posts/new" className="text-blue-500 hover:text-blue-600 hover:underline font-semibold">
                    新しく地図を作成する
                </Link>
            </p>
            <div className="grid grid-cols-1 gap-6 max-h-[600px] overflow-y-scroll">
                {sortedPosts.map((post) => (
                    <div
                        key={post.id}
                        className="block p-6 h-32 bg-white shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300"
                    >
                        <Link
                            to={`/posts/${post.id}`}
                            className="mb-4 text-xl font-bold text-gray-700"
                        >
                            {post.id}: {post.title}
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">
                            Created at: {new Date(post.created_at).toLocaleDateString()}
                        </p>
                        {/* <div className="flex justify-end space-x-3">
                            <Link
                                to={`/posts/edit/${post.id}`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                    Edit
                                </button>
                            </Link>
                            <button
                                onClick={(e) => {
                                    // handleDelete(post.id);
                                    e.preventDefault();
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Delete
                            </button>
                        </div> */}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
