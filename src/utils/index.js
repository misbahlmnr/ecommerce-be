const formatResponseAPI = {
  success: (message = "Request successfuly", data = []) => {
    return {
      success: true,
      message,
      data,
    };
  },
  error: (message = "Something when wrong", details = []) => {
    return {
      success: false,
      message,
      details,
    };
  },
};

module.exports = formatResponseAPI;
