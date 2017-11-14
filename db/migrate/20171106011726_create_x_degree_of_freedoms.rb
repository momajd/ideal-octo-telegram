class CreateXDegreeOfFreedoms < ActiveRecord::Migration[5.1]
  def change
    create_table :x_degree_of_freedoms do |t|
      t.boolean :fixed, default: false
      t.float :displacement
      t.float :reaction
      t.integer :node_id

      t.timestamps
    end
    add_index :x_degree_of_freedoms, :node_id
  end
end
