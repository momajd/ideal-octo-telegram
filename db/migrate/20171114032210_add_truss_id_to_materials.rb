class AddTrussIdToMaterials < ActiveRecord::Migration[5.1]
  def change
    add_column :materials, :truss_id, :integer
    add_index :materials, :truss_id
  end
end
