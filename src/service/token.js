let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("token")
    }
  };

export default  axiosConfig;