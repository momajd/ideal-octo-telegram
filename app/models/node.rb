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
    @dof_x.fixed?
  end

  def y_fixed?
    @dof_y.fixed?
  end

  def add_restraint!(direction)
    if direction == "x"
      @dof_x.fixed = true
      @dof_x.save!
    elsif direction == "y"
      @dof_y.fixed = true
      @dof_y.save!
    end
  end

  def total_load(direction)
    return unless ["x", "y"].include?(direction)
    self.loads.where(direction: direction).sum(:magnitude)
  end

  private
  def load_dofs
    return if @dof_x || @dof_y
    @dof_x, @dof_y = self.x_degree_of_freedom, self.y_degree_of_freedom

    self.build_x_degree_of_freedom unless @dof_x
    self.build_y_degree_of_freedom unless @dof_y
  end
end
