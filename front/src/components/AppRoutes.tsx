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
import UserPosts from "../user/UserPosts"
import UserPost from "../user/UserPost"
import User from '../user/User';

const AppRoutes = () => {

  const { loading, isSignedIn } = useContext(AuthContext)
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    if (loading) {
      return <LoadingSpinner />;
    }
    return isSignedIn ? children : <Navigate to="/" />;
  };


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />}>
        <Route path=":paramsId" element={<Post />} />
      </Route>
      <Route path="/posts/new" element={<CreatePost />} />
      <Route path="/posts/edit" element={<EditPosts />}>
        <Route path=":paramsId" element={<EditPost />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/userpostslist/:userId/bookmarkposts"
        element={
          <PrivateRoute>
            <BookmarkPosts />
          </PrivateRoute>
        }
      />
      <Route
        path="/userpostslist/:userId"
        element={
          <PrivateRoute>
            <UserPostsList />
          </PrivateRoute>
        }
      />
      <Route path="/userposts" element={
        <PrivateRoute>
          <UserPosts />
        </PrivateRoute>
      }>
        <Route path=":paramsId" element={
          <PrivateRoute>
            <UserPost />
          </PrivateRoute>
        } />
      </Route>
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
