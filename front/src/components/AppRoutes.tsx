import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import EditPosts from '../posts/EditPosts';
import Login from '../user/Login';
import React, { Dispatch, SetStateAction } from 'react';
import Signup from '../user/Signup';
import User from '../user/User';

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
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user" element={<User />} />
      </Routes>
   </div>
  )
}

export default AppRoutes;
