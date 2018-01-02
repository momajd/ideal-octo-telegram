const ApiUtils = {
  getAllTrusses: (successCallback) => {
    $.ajax({
      url: 'api/trusses',
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
