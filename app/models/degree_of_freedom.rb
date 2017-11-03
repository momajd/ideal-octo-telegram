class DegreeOfFreedom < ApplicationRecord
  validates :direction, inclusion: {in: ["x", "y"],
      message: "%{value} not a valid direction"}

  belongs_to :node

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
