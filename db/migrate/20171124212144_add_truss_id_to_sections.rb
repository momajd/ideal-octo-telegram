class AddTrussIdToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :truss_id, :integer
    add_index :sections, :truss_id
  end
end
