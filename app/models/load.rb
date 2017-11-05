class Load < ApplicationRecord
  belongs_to :node

  validates :direction, :magnitude, presence: true
end
