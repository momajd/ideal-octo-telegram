class RenameMatrixColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :x_degree_of_freedoms, :matrix_row_i, :matrix_row
    rename_column :y_degree_of_freedoms, :matrix_row_i, :matrix_row
  end
end
