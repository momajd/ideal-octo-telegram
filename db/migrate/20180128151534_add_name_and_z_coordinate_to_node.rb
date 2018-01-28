class AddNameAndZCoordinateToNode < ActiveRecord::Migration[5.1]
  def change
    add_column :nodes, :z_coord, :float
    add_column :nodes, :name, :string
  end
end
