class AddImageToMarkers < ActiveRecord::Migration[7.0]
  def change
    add_column :markers, :image, :string
  end
end
