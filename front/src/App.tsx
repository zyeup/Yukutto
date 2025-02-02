import React, { useEffect, useState, createContext } from 'react';
import { getCurrentUser } from "./api/auth"
import { User, PostData } from "./interfaces/index"
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'
import Header from './components/Header'
import api from './api/axios';
import AppRoutes from './components/AppRoutes';

export const AuthContext = createContext({} as {
  posts: PostData[]
  setPosts: React.Dispatch<React.SetStateAction<PostData[]>>
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
      <AuthContext.Provider value={{ posts, setPosts, loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Header ></Header>
            <AppRoutes ></AppRoutes>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
};

export default App
