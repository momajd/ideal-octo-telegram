class DropDegreeOfFreedomsTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :degree_of_freedoms
  end
end
