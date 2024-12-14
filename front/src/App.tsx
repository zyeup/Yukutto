import React, { useEffect, useState } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'
import Header from './components/Header'
import api from './api/axios';
import AppRoutes from './components/AppRoutes';

type PostData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  update_at: string;
}

const App: React.FC = () => {

  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await api.get('/posts');
      setPosts(response.data);
      setIsLoading(false)
    };
    fetchPosts();
  }, []);

  return (
    <>
    {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Header></Header>
          <AppRoutes posts={posts} setPosts={setPosts} ></AppRoutes>
       </div>
     )}
    </>
  );
};

export default App
