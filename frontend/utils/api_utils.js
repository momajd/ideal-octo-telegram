const ApiUtils = {
  getAllTrusses: (successCallback) => {
    $.ajax({
      url: 'api/trusses',
      success: successCallback
    });
  },

  getTruss: (id, successCallback) => {
    $.ajax({
      url: `api/trusses/${id}`,
      success: successCallback
    });
  },

  createTruss: (name, successCallback) => {
    $.ajax({
      type: 'POST',
      url: 'api/trusses',
      data: {truss: {name: name}},
      success: successCallback
    });
  },

  createNode: (nodeName, xCoord, yCoord, zCoord, trussId, successCallback) => {
    $.ajax({
      type: "POST",
      url: `api/trusses/${trussId}/nodes`,
      data: {node: {name: nodeName, x_coord: xCoord, y_coord: yCoord, z_coord: zCoord,
        truss_id: trussId}},
      success: successCallback
    });
  },

  createSection: (sectionName, area, trussId, successCallback) => {
    $.ajax({
      type: "POST",
      url: `api/trusses/${trussId}/sections`,
      data: {section: {name: sectionName, area: area, truss_id: trussId}},
      success: successCallback
    });
  },

  createMaterial: (materialName, elasticModulus, trussId, successCallback) => {
    $.ajax({
      type: "POST",
      url: `api/trusses/${trussId}/materials`,
      data: {material: {name: materialName, elastic_modulus: elasticModulus, truss_id: trussId}},
      success: successCallback
    });
  },

  createMember: (memberName, nearNodeId, farNodeId, trussId, successCallback) => {
    $.ajax({
      type: "POST",
      url: `api/trusses/${trussId}/members`,
      data: {member: {name: memberName, near_node_id: nearNodeId, far_node_id: farNodeId,
        truss_id: trussId}},
      success: successCallback
    });
  }
};

export default ApiUtils;
