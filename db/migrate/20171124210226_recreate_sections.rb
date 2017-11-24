class RecreateSections < ActiveRecord::Migration[5.1]
  def change
    drop_table :sections

    create_table :sections do |t|
      t.string :name, null: false
      t.float :area, null: false

      t.timestamps
    end
  end
end
