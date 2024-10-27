import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Map from './pages/map';
import Header from './components/Header'
import Posts from './posts/posts'
import Post from './posts/post';
import axios from 'axios';
import CreatePost from './posts/create_post';
import EditPost from './posts/edit_post';
import EditPosts from './posts/edit_posts';

interface PostData {
  id: string;
  title: string;
  content: string;
  created_at: string;
  update_at: string;
}

const App: React.FC = () => {

  const [posts, setPosts] = useState<Record<string, PostData>>({});

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await axios.get('http://localhost:3000/api/v1/posts');
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
