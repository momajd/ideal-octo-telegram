class CreateSections < ActiveRecord::Migration[5.1]
  def change
    create_table :sections do |t|
      t.string :name, null: false
      t.float :area, null: false
    end

    remove_column :materials, :area, :float
    add_column :materials, :name, :string, null: false 
  end
end
