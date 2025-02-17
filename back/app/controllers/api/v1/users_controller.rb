class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    users = User.all.includes(:followers, :following)
    users_with_counts = users.map do |user|
    user.attributes.merge(
      "followers_count" => user.followers.count,
      "following_count" => user.following.count,
    )
    end
    render json: users_with_counts
  end

  def show
    users = User.find(params[:id])
    render json: users
  rescue ActiveRecord::RecordNotFound
    render json: { error: "ユーザーが見つかりません" }, status: :not_found
  end

  def following
    @user = User.find(params[:id])
    render json: @user.following
  end
end
