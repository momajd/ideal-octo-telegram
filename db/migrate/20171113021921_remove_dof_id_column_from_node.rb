class RemoveDofIdColumnFromNode < ActiveRecord::Migration[5.1]
  def change
    remove_column :nodes, :dof_x_id
    remove_column :nodes, :dof_y_id 
  end
end
