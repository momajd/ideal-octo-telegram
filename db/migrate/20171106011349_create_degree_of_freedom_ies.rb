class CreateDegreeOfFreedomIes < ActiveRecord::Migration[5.1]
  def change
    create_table :degree_of_freedom_ies do |t|

      t.timestamps
    end
  end
end
