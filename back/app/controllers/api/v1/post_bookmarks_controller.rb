class Api::V1::PostBookmarksController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_post, only: [:create, :destroy]

  def create
    bookmark = current_api_v1_user.post_bookmarks.build(post: @post)

    if bookmark.save
      render json: { post_id: @post.id, message: 'ブックマークしました' }, status: :created
    else
      render json: { message: 'ブックマークに失敗しました' }, status: :unprocessable_entity
    end
  end

  def destroy
    bookmark = current_api_v1_user.post_bookmarks.find_by(post: @post)

    if bookmark&.destroy
      render json: { post_id: @post.id, message: 'ブックマークを解除しました'}, status: :ok
    else
      render json: { message: 'ブックマークの解除に失敗しました' }, status: :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: '投稿が見つかりません' }, status: :not_found
  end
end
