class AddPostToMarkers < ActiveRecord::Migration[7.0]
  def change
    add_reference :markers, :post, foreign_key: true
  end
end
