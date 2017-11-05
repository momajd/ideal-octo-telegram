class CreateLoads < ActiveRecord::Migration[5.1]
  def change
    create_table :loads do |t|
      t.integer :node_id, null: false
      t.string :direction, null: false
      t.float :magnitude, null: false

      t.timestamps
    end
    add_index :loads, :node_id
  end
end
