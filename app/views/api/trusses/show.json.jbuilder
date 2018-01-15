json.extract! @truss, :id, :name

json.nodes @truss.nodes, :id, :truss_id, :x_coord, :y_coord;
