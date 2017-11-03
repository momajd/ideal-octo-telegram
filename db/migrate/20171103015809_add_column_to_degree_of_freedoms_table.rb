class AddColumnToDegreeOfFreedomsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :degree_of_freedoms, :node_id, :integer
    add_index :degree_of_freedoms, :node_id
  end
end
