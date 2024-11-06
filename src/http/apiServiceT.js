//import axios from 'axios';

const apiRequest = async (endpoint, method, payload = {}, config = {}) => {
  try {
    console.log(endpoint, method, payload);
    const response = await axios({
      method: method,
      url: endpoint,
      data: payload,
      ...config,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.error('Error response:', error.response.data);
    throw new Error(
      `API Error: ${error.response.status} - ${error.response.statusText}`,
    );
  }
};

export default apiRequest;
