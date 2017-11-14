class CreateMaterials < ActiveRecord::Migration[5.1]
  def change
    create_table :materials do |t|
      t.float :elastic_modulus, null: false
      t.float :area, null: false

      t.timestamps
    end

    add_column :members, :material_id, :float
    add_index :members, :material_id
  end
end
