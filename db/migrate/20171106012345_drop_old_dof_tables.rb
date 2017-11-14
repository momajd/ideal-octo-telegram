class DropOldDofTables < ActiveRecord::Migration[5.1]
  def change
    drop_table :degree_of_freedom_ies
    drop_table :degree_of_freedom_xes
  end
end
