class AddTrussIdColumnToNodesTable < ActiveRecord::Migration[5.1]
  def change
    add_column :nodes, :truss_id, :integer
    add_index :nodes, :truss_id
  end
end
