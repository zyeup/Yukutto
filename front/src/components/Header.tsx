import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Cookies from "js-cookie"
import { signOut } from "../api/auth"
import { AuthContext } from "../App"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <button color="inherit" onClick={handleSignOut}>
              Sign out
            </button>
            <li>
              <Link to="/user" onClick={toggleSidebar} className="hover:underline">
                ユーザー情報
              </Link>
            </li>
            <li>
              <Link to="/userposts" onClick={toggleSidebar} className="hover:underline">
                投稿したポスト
              </Link>
            </li>
          </>
        )
      } else {
        return (
          <>
            <li>
              <Link to="/signin" onClick={toggleSidebar} className="hover:underline">
                ログイン
              </Link>
            </li>
            <li>
              <Link to="/signup" onClick={toggleSidebar} className="hover:underline">
                新規会員登録
              </Link>
            </li>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className="bg-black text-white font-bold py-4 px-6 shadow-md flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-white hover:bg-gray-800 p-2 rounded-md transition duration-300">
          ☰
        </button>
        <div className="text-lg">
          <Link to="/" className="hover:underline text-white transition duration-200">
            Map App
          </Link>
        </div>
      </div>
      <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ width: '250px' }}>
        <button onClick={toggleSidebar} className="text-white hover:bg-gray-700 p-2 rounded-md transition duration-300 m-4">
          Close
        </button>
        <ul className="p-4 space-y-4">
          <li>
            <Link to="/" onClick={toggleSidebar} className="hover:underline">
              Home
            </Link>
          </li>
          <AuthButtons />
        </ul>
      </div>
    </>
  );
};

export default Header;
