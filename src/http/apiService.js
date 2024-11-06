//import axios from 'axios';


const apiRequest = async (endpoint, method, payload = {}, config = {}, token) => {
  try {
    
    /*
    const response = await axios({
      method: method,
      url: endpoint,
      data: payload, 
      ...config,
    });
    */
   const response = {
    method: method,
    url: endpoint, 
    data: payload,
    headers: {
      'Authorization': token ? `Bearer ${token}` : undefined,
      ...config.headers, 
    },
    ...config
   }
   console.log(response)

    return response 
  } catch (error) {
    
    
      
      console.error('Error response:', error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    
  }
};

export default apiRequest;
