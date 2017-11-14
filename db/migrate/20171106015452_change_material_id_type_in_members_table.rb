class ChangeMaterialIdTypeInMembersTable < ActiveRecord::Migration[5.1]
  def change
    change_column :members, :material_id, :integer
  end
end
