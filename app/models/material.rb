class Material < ApplicationRecord
  belongs_to :truss
  has_many :members
end
