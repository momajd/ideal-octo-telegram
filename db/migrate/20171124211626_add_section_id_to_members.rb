class AddSectionIdToMembers < ActiveRecord::Migration[5.1]
  def change
    add_column :members, :section_id, :integer
    add_index :members, :section_id
  end
end
