json.extract! @truss, :id, :name

json.nodes @truss.nodes, :id, :name, :x_coord, :y_coord, :z_coord

json.materials @truss.materials, :id, :name, :elastic_modulus

json.sections @truss.sections, :id, :name, :area

json.members @truss.members do |member|
  json.id member.id
  json.name member.name
  json.section member.section
  json.material member.material

  json.near_node do
    json.id member.near_node.id
    json.name member.near_node.name
  end

  json.far_node do
    json.id member.far_node.id
    json.name member.far_node.name
  end
end
