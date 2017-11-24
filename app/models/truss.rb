class Truss < ApplicationRecord
  has_many :members, dependent: :destroy
  has_many :nodes, dependent: :destroy
  has_many :materials, dependent: :destroy
  has_many :sections, dependent: :destroy
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
      area, elastic_mod = member.section.area, member.material.elastic_modulus

      i1 = member.near_node.x_degree_of_freedom.matrix_row
      i2 = member.near_node.y_degree_of_freedom.matrix_row
      i3 = member.far_node.x_degree_of_freedom.matrix_row
      i4 = member.far_node.y_degree_of_freedom.matrix_row

      matrix[i1, i1] += area * elastic_mod * lambda_x**2 / length
      matrix[i1, i2] += area * elastic_mod * lambda_x * lambda_y / length
      matrix[i1, i3] += area * elastic_mod * -lambda_x**2 / length
      matrix[i1, i4] += area * elastic_mod * -lambda_x * lambda_y / length

      matrix[i2, i1] += area * elastic_mod * lambda_x * lambda_y / length
      matrix[i2, i2] += area * elastic_mod * lambda_y**2 / length
      matrix[i2, i3] += area * elastic_mod * -lambda_x * lambda_y / length
      matrix[i2, i4] += area * elastic_mod * -lambda_y**2 / length

      matrix[i3, i1] += area * elastic_mod * -lambda_x**2 / length
      matrix[i3, i2] += area * elastic_mod * -lambda_x * lambda_y / length
      matrix[i3, i3] += area * elastic_mod * lambda_x**2 / length
      matrix[i3, i4] += area * elastic_mod * lambda_x * lambda_y / length

      matrix[i4, i1] += area * elastic_mod * -lambda_x * lambda_y / length
      matrix[i4, i2] += area * elastic_mod * -lambda_y**2 / length
      matrix[i4, i3] += area * elastic_mod * lambda_x * lambda_y / length
      matrix[i4, i4] += area * elastic_mod * lambda_y**2 / length
    end
    matrix
  end

  def solve_displacements!
    free_dofs = degree_of_freedoms.select {|dof| !dof.fixed}.sort_by {|dof| dof.matrix_row}
    subset_i = free_dofs[-1].matrix_row

    sub_stiffness_matrix = stiffness_matrix.minor(0..subset_i, 0..subset_i)

    applied_loads = []
    (0..subset_i).each do |i|
      dof = free_dofs[i]
      applied_loads << dof.node.total_load(dof.direction)
    end

    augmented_matrix = sub_stiffness_matrix.augment(applied_loads)
    displacements  = augmented_matrix.gauss_jordan

    displacements.each_with_index {|delta, i| free_dofs[i].update!(displacement: delta)}
  end

  def solve_reactions!
    dofs = degree_of_freedoms.sort_by {|dof| dof.matrix_row}
    displacements = dofs.map {|dof| dof.displacement}
    displacements = Matrix.columns([displacements])
    forces = stiffness_matrix * displacements

    forces.each_with_index {|val, i| dofs[i].update!(reaction: val.round(5)) if dofs[i].fixed?}
  end
end
