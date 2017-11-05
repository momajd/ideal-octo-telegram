class AddForeignKeyColumnsToNode < ActiveRecord::Migration[5.1]
  def change
    add_column :nodes, :dof_x_id, :integer, index: true
    add_index :nodes, :dof_x_id
    add_column :nodes, :dof_y_id, :integer, index: true
    add_index :nodes, :dof_y_id
    remove_column :degree_of_freedoms, :node_id, :integer
  end
end
