class Node < ApplicationRecord
  belongs_to :dof_x, class_name: "DegreeOfFreedom", foreign_key: :dof_x_id, dependent: :destroy
  belongs_to :dof_y, class_name: "DegreeOfFreedom", foreign_key: :dof_y_id, dependent: :destroy
  has_many :loads

  validates :x_coord, :y_coord, presence: true
  after_initialize :load_dofs

  def x_fixed?
    @dof_x.fixed?
  end

  def y_fixed?
    @dof_y.fixed?
  end

  def add_restraint!(direction)
    if direction == "x"
      @dof_x.fixed = true
    elsif direction == "y"
      @dof_y.fixed = true
    end
  end

  def total_load(direction)
    return unless ["x", "y"].include?(direction)
    self.loads.where(direction: direction).sum(:magnitude)
  end

  private
  def load_dofs
    return if @dof_x || @dof_y
    @dof_x, @dof_y = self.dof_x, self.dof_y

    self.build_dof_x(direction: "x") unless @dof_x
    self.build_dof_y(direction: "y") unless @dof_y
  end
end
