class Material < ApplicationRecord
  belongs_to :truss
  has_many :members

  validates :name, :elastic_modulus, presence: true
end
