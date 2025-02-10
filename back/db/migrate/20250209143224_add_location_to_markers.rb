class AddLocationToMarkers < ActiveRecord::Migration[7.0]
  def change
    add_reference :markers, :location, foreign_key: true
  end
end
