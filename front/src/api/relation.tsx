import api from "./axios";

export const followUser = async (followedId: number) => {
  return api.post("/follows", { followed_id: followedId });
};

export const unfollowUser = async (followedId: number) => {
  return api.delete(`/follows/${followedId}`);
};
