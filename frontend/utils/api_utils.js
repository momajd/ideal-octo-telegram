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
  }
};

export default ApiUtils;
