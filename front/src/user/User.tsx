import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";
import { Link } from 'react-router-dom';
import api from "../api/axios";
import { followUser, unfollowUser } from "../api/relation";

interface User {
  id: number;
  name: string;
  email: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

const UserList: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        let fetchedUsers: User[] = res.data;
        // currentUser が存在すれば、自分の情報を先頭に配置する
        if (currentUser) {
          const storedCurrentUser = fetchedUsers.find((user) => user.id === currentUser.id);
          if (storedCurrentUser) {
            fetchedUsers = fetchedUsers.filter((user) => user.id !== currentUser.id);
            fetchedUsers.unshift(storedCurrentUser);
          }
        }
        setUsers(fetchedUsers);
      } catch (error) {
        alert("ユーザー一覧取得失敗");
      }
    };

    fetchUsers();
  }, [currentUser]);

  // 現在のユーザーのフォロー情報を取得する
  useEffect(() => {
    if (!currentUser) return;
    const fetchFollowing = async () => {
      try {
        const res = await api.get(`/users/${currentUser.id}/following`);
        const followingMap: { [key: number]: boolean } = {};
        res.data.forEach((user: { id: number }) => {
          followingMap[user.id] = true;
        });
        setFollowing(followingMap);
      } catch (error) {
        alert("フォロー情報取得失敗");
      }
    };

    fetchFollowing();
  }, [currentUser]);

  const handleFollow = async (userId: number) => {
    try {
      await followUser(userId);
      setFollowing((prev) => ({ ...prev, [userId]: true }));
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return { ...user, followersCount: user.followersCount + 1 };
          } else if (user.id === currentUser?.id) {
            return { ...user, followingCount: user.followingCount + 1 };
          }
          return user;
        })
      );
    } catch (error) {
      alert("フォロー失敗");
    }
  };


  const handleUnfollow = async (userId: number) => {
    try {
      await unfollowUser(userId);
      setFollowing((prev) => ({ ...prev, [userId]: false }));
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.id === userId) {
            return { ...user, followersCount: user.followersCount - 1 };
          } else if (user.id === currentUser?.id) {
            return { ...user, followingCount: user.followingCount - 1 };
          }
          return user;
        })
      );
    } catch (error) {
      alert("フォロー解除失敗");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-20">
      <h2 className="text-2xl font-bold mb-4">ユーザー一覧</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b last:border-b-0"
          >
            <div>
              <p className="text-lg font-semibold">
                <Link to={`/userpostslist/${user.id}`} className="text-lg font-semibold">
                  {user.name}
                </Link>
                {currentUser && currentUser.id !== user.id && following[user.id] && (
                  <span className="ml-2 text-xs text-green-500">(フォロー中)</span>
                )}
              </p>
              <p className="text-xs text-gray-500">
                フォロー: {user.followingCount} / フォロワー: {user.followersCount} / 投稿数: {user.postsCount}
              </p>
            </div>
            {/* 自分自身の場合はフォロー／解除ボタンは表示しない */}
            {currentUser && currentUser.id !== user.id && (
              <button
                onClick={() =>
                  following[user.id]
                    ? handleUnfollow(user.id)
                    : handleFollow(user.id)
                }
                className={`mt-2 sm:mt-0 px-4 py-2 rounded text-white transition ${following[user.id]
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
              >
                {following[user.id] ? "フォロー解除" : "フォロー"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
