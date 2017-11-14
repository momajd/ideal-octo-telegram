class AddColumnToDofs < ActiveRecord::Migration[5.1]
  def change
    add_column :x_degree_of_freedoms, :matrix_row_i, :integer
    add_index :x_degree_of_freedoms, :matrix_row_i
    add_column :y_degree_of_freedoms, :matrix_row_i, :integer
    add_index :y_degree_of_freedoms, :matrix_row_i
  end
end
