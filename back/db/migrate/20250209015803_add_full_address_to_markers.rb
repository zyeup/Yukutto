class AddFullAddressToMarkers < ActiveRecord::Migration[7.0]
  def change
    add_column :markers, :full_address, :string
  end
end
