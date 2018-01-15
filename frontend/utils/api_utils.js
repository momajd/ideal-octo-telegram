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

  createNode: (xCoord, yCoord, trussId, successCallback) => {
    $.ajax({
      type: "POST",
      url: `api/trusses/${trussId}/nodes`,
      data: {node: {x_coord: xCoord, y_coord: yCoord, truss_id: trussId}},
      success: successCallback
    });
  }
};

export default ApiUtils;
