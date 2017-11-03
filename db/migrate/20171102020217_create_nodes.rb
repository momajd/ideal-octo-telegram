class CreateNodes < ActiveRecord::Migration[5.1]
  def change
    create_table :nodes do |t|
      t.float :x_coord, null: false
      t.float :y_coord, null: false

      t.timestamps
    end
  end
end
