class CreateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :members do |t|
      t.integer :near_node_id, null: false
      t.integer :far_node_id, null: false

      t.timestamps
    end
    add_index :members, :near_node_id
    add_index :members, :far_node_id
  end
end
