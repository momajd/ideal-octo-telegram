json.extract! @truss, :id, :name

json.nodes @truss.nodes, :id, :truss_id, :name, :x_coord, :y_coord, :z_coord;
