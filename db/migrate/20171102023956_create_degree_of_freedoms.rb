class CreateDegreeOfFreedoms < ActiveRecord::Migration[5.1]
  def change
    create_table :degree_of_freedoms do |t|
      t.string :direction, null: false
      t.boolean :fixed, default: false
      t.float :displacement
      t.float :reaction

      t.timestamps
    end
  end
end
