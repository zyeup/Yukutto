import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
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
      return null;
    }
    return isSignedIn ? children : <Navigate to="/signin" />;
  };


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":ParamsId" element={<Post />} />
        </Route>
        <Route path="posts/new" element={<CreatePost />} />
        <Route path="/posts/edit" element={<EditPosts />}>
          <Route path=":ParamsId" element={<EditPost />} />
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
        <Route path="/userposts" element={<UserPosts />}>
          <Route path=":ParamsId" element={<UserPost />} />
        </Route>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <User />
            </PrivateRoute>
          } />
      </Routes>
    </div>
  )
}

export default AppRoutes;
