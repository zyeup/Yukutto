import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../App"

const Home = () => {
    const { posts } = useContext(AuthContext)
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
