import { useNavigate, Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Cookies from "js-cookie";
import { AuthContext } from "../App";
import { signOut } from "../api/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const res = await signOut();
      if (res.data.success) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setIsSignedIn(false);
        navigate("/signin");
        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-200 text-white font-semibold py-4 px-6 shadow-md flex justify-between items-center z-50">
      <Link to="/" className="text-3xl font-extrabold text-black hover:text-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
        Yukutto
      </Link>

      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-300"
        >
          {isSignedIn ? currentUser?.name : "ゲスト"} ▼
        </button>

        {isMenuOpen && (
          <div
            className="absolute right-0 mt-2 w-56 bg-gray-800/90 text-white shadow-md rounded-lg py-2"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
          >
            {isSignedIn ? (
              <>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-500">
                  Home
                </Link>
                <Link to="/posts/all" className="block px-4 py-2 hover:bg-gray-500">
                  すべてのマーカーを見る
                </Link>
                <Link to="/user" className="block px-4 py-2 hover:bg-gray-500">
                  ユーザー情報
                </Link>
                <Link to={`/userpostslist/${currentUser?.id}`} className="block px-4 py-2 hover:bg-gray-500">
                  投稿したポスト
                </Link>
                <Link to={`/userpostslist/${currentUser?.id}/bookmarkposts`} className="block px-4 py-2 hover:bg-gray-500">
                  ブックマークした投稿
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 transition duration-300"
                >
                  サインアウト
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="block px-4 py-2 hover:bg-gray-500">
                  ログイン
                </Link>
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-500">
                  新規会員登録
                </Link>
                <Link to="/posts/all" className="block px-4 py-2 hover:bg-gray-500">
                  すべてのマーカーを見る
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
