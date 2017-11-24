class AddDefaultsToDegreeOfFreedoms < ActiveRecord::Migration[5.1]
  def change
    change_column_default :x_degree_of_freedoms, :displacement, 0
    change_column_default :y_degree_of_freedoms, :displacement, 0
  end
end
