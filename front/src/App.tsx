import React, { useEffect, useState, createContext } from 'react';
import { getCurrentUser } from "./api/auth"
import { User } from "./interfaces/index"
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

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {

  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  useEffect(() => {
    const fetchPosts = async () => {

      const response = await api.get('/posts');
      setPosts(response.data);
      setIsLoading(false)
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <Header></Header>
              <AppRoutes posts={posts} setPosts={setPosts} loading={loading} isSignedIn={isSignedIn} ></AppRoutes>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
};

export default App
