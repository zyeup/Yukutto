class AddContentToMarkers < ActiveRecord::Migration[7.0]
  def change
    add_column :markers, :content, :string
  end
end
