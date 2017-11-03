class Node < ApplicationRecord
  has_one :dof_x, class_name: "DegreeOfFreedom", dependent: :destroy
  has_one :dof_y, class_name: "DegreeOfFreedom", dependent: :destroy

  after_initialize :create_dofs

  def create_dofs
    self.build_dof_x(direction: "x")
    self.build_dof_y(direction: "y")
  end
end
