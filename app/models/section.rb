class Section < ApplicationRecord
  belongs_to :truss
  has_many :members
end
