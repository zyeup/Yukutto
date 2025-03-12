class Api::V1::PostBookmarksController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :set_post, only: [:create, :destroy]

  def index
    bookmarks = current_api_v1_user.post_bookmarks.map { |bookmark| bookmark.post_id }
    render json: { bookmarks: bookmarks }
  end


  def create
    bookmark = current_api_v1_user.post_bookmarks.build(post: @post)

    if bookmark.save
      head :created
    else
      head :unprocessable_entity
    end
  end

  def destroy
    bookmark = current_api_v1_user.post_bookmarks.find_by(post: @post)

    if bookmark&.destroy
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  rescue ActiveRecord::RecordNotFound
    head :not_found
  end
end
