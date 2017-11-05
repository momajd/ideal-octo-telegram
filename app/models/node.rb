class Node < ApplicationRecord
  belongs_to :dof_x, class_name: "DegreeOfFreedom", foreign_key: :dof_x_id, dependent: :destroy
  belongs_to :dof_y, class_name: "DegreeOfFreedom", foreign_key: :dof_y_id, dependent: :destroy
  has_many :loads

  validates :x_coord, :y_coord, presence: true
  after_initialize :create_dofs

  def x_fixed?
    self.dof_x.fixed?
  end

  def y_fixed?
    self.dof_y.fixed?
  end

  def add_restraint!(direction)
    if direction == "x"
      self.dof_x.fixed = true
    elsif direction == "y"
      self.dof_y.fixed = true
    end
  end

  private
  def create_dofs
    return unless self.dof_x.nil?
    self.build_dof_x(direction: "x")
    self.build_dof_y(direction: "y")
  end
end
