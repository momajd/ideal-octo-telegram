class CreateDegreeOfFreedomXes < ActiveRecord::Migration[5.1]
  def change
    create_table :degree_of_freedom_xes do |t|

      t.timestamps
    end
  end
end
