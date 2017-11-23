# require_relative '../../lib/extend_matrix.rb'

class Truss < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :nodes, dependent: :destroy
  has_many :materials, dependent: :destroy
  has_many :x_degree_of_freedoms, through: :nodes
  has_many :y_degree_of_freedoms, through: :nodes
  has_many :loads, through: :nodes

  def degree_of_freedoms
    x_degree_of_freedoms + y_degree_of_freedoms
  end

  # private TODO
  def assign_stiff_matrix_rows!
    dofs = degree_of_freedoms.sort_by {|dof| dof.free? ? 0 : 1} #order free dofs first
    dofs.each_with_index{|dof, i| dof.update!(matrix_row: i)}
  end

  def stiffness_matrix
    n = degree_of_freedoms.length
    matrix = Matrix.build(n, n) {0}

    self.members.each do |member|
      length, lambda_x, lambda_y = member.length, member.lambda_x, member.lambda_y

      i1 = member.near_node.x_degree_of_freedom.matrix_row
      i2 = member.near_node.y_degree_of_freedom.matrix_row
      i3 = member.far_node.x_degree_of_freedom.matrix_row
      i4 = member.far_node.y_degree_of_freedom.matrix_row

      matrix[i1, i1] += lambda_x**2 / length
      matrix[i1, i2] += lambda_x * lambda_y / length
      matrix[i1, i3] += -lambda_x**2 / length
      matrix[i1, i4] += -lambda_x * lambda_y / length

      matrix[i2, i1] += lambda_x * lambda_y / length
      matrix[i2, i2] += lambda_y**2 / length
      matrix[i2, i3] += -lambda_x * lambda_y / length
      matrix[i2, i4] += -lambda_y**2 / length

      matrix[i3, i1] += -lambda_x**2 / length
      matrix[i3, i2] += -lambda_x * lambda_y / length
      matrix[i3, i3] += lambda_x**2 / length
      matrix[i3, i4] += lambda_x * lambda_y / length

      matrix[i4, i1] += -lambda_x * lambda_y / length
      matrix[i4, i2] += -lambda_y**2 / length
      matrix[i4, i3] += lambda_x * lambda_y / length
      matrix[i4, i4] += lambda_y**2 / length
    end
    matrix
  end

  def solve_displacements!
    free_dofs = x_degree_of_freedoms.where(fixed: false) + y_degree_of_freedoms.where(fixed: false)
    subset_i = free_dofs.max_by {|dof| dof.matrix_row}.matrix_row

    sub_stiffness_matrix = stiffness_matrix.minor(0..subset_i, 0..subset_i)

    applied_loads = []
    (0..subset_i).each do |i|
      dof = x_degree_of_freedoms.find_by(matrix_row: i)
      dof = y_degree_of_freedoms.find_by(matrix_row: i) unless dof

      applied_loads << dof.node.total_load(dof.direction)
    end

    augmented_matrix = sub_stiffness_matrix.augment(applied_loads)
    displacements  = augmented_matrix.gauss_jordan 
  end
end