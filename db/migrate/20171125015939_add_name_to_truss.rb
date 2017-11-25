class AddNameToTruss < ActiveRecord::Migration[5.1]
  def change
    add_column :trusses, :name, :string
  end
end
