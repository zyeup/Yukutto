class CreateMarkers < ActiveRecord::Migration[7.0]
  def change
    create_table :markers do |t|
      t.string :title
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
