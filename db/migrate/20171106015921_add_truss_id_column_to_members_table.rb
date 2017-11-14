class AddTrussIdColumnToMembersTable < ActiveRecord::Migration[5.1]
  def change
    add_column :members, :truss_id, :integer
    add_index :members, :truss_id
  end
end
