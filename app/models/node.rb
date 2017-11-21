class Node < ApplicationRecord
  has_one :x_degree_of_freedom, dependent: :destroy
  has_one :y_degree_of_freedom, dependent: :destroy
  has_many :loads, dependent: :destroy
  belongs_to :truss

  validates :x_coord, :y_coord, presence: true
  after_initialize :load_dofs

  def members
    # use this method instead of the 'has_many' macro
    Member.where("near_node_id = ? OR far_node_id = ?", self.id, self.id)
  end

  def x_fixed?
    x_degree_of_freedom.fixed?
  end

  def y_fixed?
    y_degree_of_freedom.fixed?
  end

  def add_restraint!(direction)
    x_degree_of_freedom.update!(fixed: true) if direction == "x"
    y_degree_of_freedom.update!(fixed: true) if direction == "y"
  end

  def total_load(direction)
    return unless ["x", "y"].include?(direction)
    self.loads.where(direction: direction).sum(:magnitude)
  end

  private
  def load_dofs
    return if self.x_degree_of_freedom || self.y_degree_of_freedom

    self.build_x_degree_of_freedom
    self.build_y_degree_of_freedom
  end
end
