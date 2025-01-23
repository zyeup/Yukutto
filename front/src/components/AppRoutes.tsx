import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import CreatePost from '../posts/CreatePost';
import EditPost from '../posts/EditPost';
import EditPosts from '../posts/EditPosts';
import React from 'react';
import SignUp from "../user/SignUp"
import SignIn from "../user/SignIn"
import UserPosts from "../user/UserPosts"
import User from '../user/User';
import { PostPropsLoading } from "../interfaces/index"

const AppRoutes: React.FC<PostPropsLoading> = ({ posts, setPosts, loading, isSignedIn }) => {

  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    if (loading) {
      return null;
    }
    return isSignedIn ? children : <Navigate to="/signin" />;
  };


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":ParamsId" element={<Post posts={posts} />} />
        </Route>
        <Route path="posts/new" element={<CreatePost posts={posts} setPosts={setPosts} />} />
        <Route path="/posts/edit" element={<EditPosts />}>
          <Route path=":ParamsId" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/userposts" element={<UserPosts />} />
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
