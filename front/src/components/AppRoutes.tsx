import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import EditPosts from '../posts/EditPosts';
import React, { Dispatch, SetStateAction } from 'react';

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


const AppRoutes: React.FC<PostProps> = ({ posts, setPosts }) => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post posts={posts} />} />
        </Route>
        <Route path="posts/new" element={<CreatePost posts={posts} setPosts={setPosts} />} />
        <Route path="/posts/edit" element={<EditPosts />}>
          <Route path=":postId" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Route>
      </Routes>
   </div>
  )
}

export default AppRoutes;
