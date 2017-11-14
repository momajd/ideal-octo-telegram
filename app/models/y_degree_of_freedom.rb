class YDegreeOfFreedom < ApplicationRecord
  # Same code as x_degree_of_freedom model (not DRY); any way to inherit?
  belongs_to :node

  validates :fixed, inclusion: {in: [true, false]}

  def fixed?
    self.fixed
  end

  def free?
    !self.fixed
  end

  def add_restraint!
    self.fixed = true
  end

  def direction
    "y"
  end
end
