class CreateTrusses < ActiveRecord::Migration[5.1]
  def change
    create_table :trusses do |t|

      t.timestamps
    end
  end
end
