require 'mathn'

class Member < ApplicationRecord
  belongs_to :near_node, class_name: "Node", foreign_key: :near_node_id
  belongs_to :far_node, class_name: "Node", foreign_key: :far_node_id
  belongs_to :material
  belongs_to :section
  belongs_to :truss

  validates :near_node_id, :far_node_id, :name, :truss_id, presence: true

  def length
    n, f = near_node, far_node
    Math.sqrt((f.x_coord - n.x_coord)**2 + (f.y_coord - n.y_coord)**2)
  end

  def lambda_x
    (far_node.x_coord - near_node.x_coord) / length
  end

  def lambda_y
    (far_node.y_coord - near_node.y_coord) / length
  end

  def internal_force
    section.area * material.elastic_modulus / length * (
      -lambda_x * near_node.x_degree_of_freedom.displacement +
      -lambda_y * near_node.y_degree_of_freedom.displacement +
      lambda_x * far_node.x_degree_of_freedom.displacement +
      lambda_y * far_node.y_degree_of_freedom.displacement
    )
  end
end
