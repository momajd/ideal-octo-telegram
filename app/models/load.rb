class Load < ApplicationRecord
  belongs_to :node

  validates :magnitude, presence: true
  validates :direction, inclusion: {in: ["x", "y"],
    message: "%{value} is not a valid direction"}
end
