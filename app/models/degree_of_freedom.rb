class DegreeOfFreedom < ApplicationRecord
  has_one :node_x, class_name: "Node", foreign_key: :dof_x_id
  has_one :node_y, class_name: "Node", foreign_key: :dof_y_id

  validates :fixed, inclusion: {in: [true, false]}
  validates :direction, inclusion: {in: ["x", "y"],
    message: "%{value} not a valid direction"}

  def fixed?
    self.fixed
  end

  def free?
    !self.fixed
  end

  def add_restraint!
    self.fixed = true
  end
end
