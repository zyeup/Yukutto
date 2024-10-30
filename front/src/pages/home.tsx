import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Dispatch, SetStateAction } from 'react'

type PostData = {
    id: string;
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

    const handleDelete = async (postId: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`);
            const newArray = [...posts].filter(post => {
                return post.id !== postId;
            })
            setPosts([...newArray]);

        } catch (err) {
            alert("削除に失敗しました")
            console.log(err);

        }
    }

    const sortedPosts = posts.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    return (
        <>
            <h2 className='text-red-800 text-2xl'>
                ここはHome画面です!!
            </h2>
            <div className='inline'>新規作成は</div>
            <Link to="/create_posts" className='hover:underline'>こちら</Link>
            {sortedPosts.map((post) => (
                <div className="px-4 py-2 mt-4" key={post.id}>
                    <Link className="hover:underline font-bold" to={`/posts/${post.id}`}>
                        {post.id}:{post.title}
                    </Link>
                    <div>
                        <Link to={`/edit_posts/${post.id}`}>
                            <button className=' bg-blue-500 hover:bg-blue-700 px-4 text-white rounded'>
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(post.id)}
                            className=' bg-red-500 hover:bg-red-700 px-2 text-white rounded'>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;
