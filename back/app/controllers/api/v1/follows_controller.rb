class Api::V1::FollowsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    followed_user = User.find(params[:followed_id])
    current_api_v1_user.following << followed_user unless current_api_v1_user.following.include?(followed_user)
    head :created
  rescue ActiveRecord::RecordNotFound
    head :not_found
  end

  def destroy
    followed_user = User.find(params[:id])
    follow = current_api_v1_user.active_relationships.find_by(followed_id: followed_user.id)
    follow.destroy if follow
    head :ok
  rescue ActiveRecord::RecordNotFound
    head :not_found
  end

end
