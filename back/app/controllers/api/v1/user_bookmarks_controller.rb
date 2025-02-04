class Api::V1::UserBookmarksController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    bookmarks = current_api_v1_user.post_bookmarks.map { |bookmark| bookmark.post_id }
    render json: { bookmarks: bookmarks }
  end
end
