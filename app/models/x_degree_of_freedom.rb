class XDegreeOfFreedom < ApplicationRecord
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
    "x"
  end
end
