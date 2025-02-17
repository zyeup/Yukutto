import api from "./axios";

export const followUser = async (followedId: number) => {
  return api.post("/follows", { followed_id: followedId });
};

export const unfollowUser = async (followedId: number) => {
  return api.delete(`/follows/${followedId}`);
};

export const getFollowing = async (userId: number) => {
  return api.get(`/users/${userId}/following`);
};

export const getFollowers = async (userId: number) => {
  return api.get(`/users/${userId}/followers`);
};
