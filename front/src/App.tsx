import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Map from './pages/map';
import Header from './components/Header'
import Posts from './posts/posts'
import Post from './posts/post';
import api from './api/axios';
import CreatePost from './posts/CreatePost';
import EditPost from './posts/EditPost';
import EditPosts from './posts/EditPosts';

type PostData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  update_at: string;
}

const App: React.FC = () => {

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await api.get('/posts');
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post posts={posts} />} />
        </Route>
        <Route path="/create_posts" element={<CreatePost posts={posts} setPosts={setPosts} />} />
        <Route path="/edit_posts" element={<EditPosts />}>
          <Route path=":postId" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App
