class Api::V1::FollowsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    followed_user = User.find(params[:followed_id])
    current_api_v1_user.following << followed_user unless current_api_v1_user.following.include?(followed_user)
    render json: { status: "success", message: "フォローしました", followed_id: followed_user.id }
  rescue ActiveRecord::RecordNotFound
    render json: { status: "error", message: "ユーザーが見つかりません" }, status: :not_found
  end

  def destroy
    followed_user = User.find(params[:id])
    follow = current_api_v1_user.active_relationships.find_by(followed_id: followed_user.id)
    follow.destroy if follow
    render json: { status: "success", message: "フォロー解除しました", followed_id: followed_user.id }
  rescue ActiveRecord::RecordNotFound
    render json: { status: "error", message: "ユーザーが見つかりません" }, status: :not_found
  end

  def following
    render json: current_api_v1_user.following
  end

  def followers
    render json: current_api_v1_user.followers
  end
end
