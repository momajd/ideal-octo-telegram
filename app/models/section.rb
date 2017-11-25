class Section < ApplicationRecord
  belongs_to :truss
  has_many :members

  validates :name, :area, presence: true
end
