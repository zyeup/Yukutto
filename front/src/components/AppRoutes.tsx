import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import LoadingSpinner from '../components/LoadingSpinner';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import EditPosts from '../posts/EditPosts';
import { useContext } from 'react';
import { AuthContext } from "../App"
import SignUp from "../user/SignUp"
import SignIn from "../user/SignIn"
import UserPostsList from "../user/UserPostsList"
import BookmarkPosts from "../user/BookmarkPosts"
import User from '../user/User';
import Starts from '../pages/Starts';

const AppRoutes = () => {

  const { loading, isSignedIn } = useContext(AuthContext)
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    if (loading) {
      return <LoadingSpinner />;
    }
    return isSignedIn ? children : <Navigate to="/home" replace />;
  };


  return (
    <Routes>
      <Route path="/" element={<Starts />} />
      <Route path="/home" element={<Home />} />
      <Route path="/starts" element={<Starts />} />
      <Route path="/posts" element={<Posts />}>
        <Route path=":paramsId" element={<Post />} />
        <Route path=":all" element={<Post />} />
      </Route>
      <Route path="/posts/new" element={<CreatePost />} />
      <Route path="/posts/edit" element={<EditPosts />}>
        <Route path=":paramsId" element={<EditPost />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/bookmarkposts/:userId"
        element={
          <PrivateRoute>
            <BookmarkPosts />
          </PrivateRoute>
        }
      />
      <Route
        path="/userpostslist/:paramsId"
        element={
          <PrivateRoute>
            <UserPostsList />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        } />
    </Routes>
  )
}

export default AppRoutes;
