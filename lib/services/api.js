// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://app.nazsystem.com:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const registerUser = (userData) => {
    return api.post('/register', userData);
  };
  
export const loginUser = (credentials) => {
  return api.post('/login', credentials);
};
  
export const getEnquiries = (token) => {
  return api.get('/enquiry', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addEnquiry = (token,data) =>{
  return api.post('/addenquiry',
    data,{
    headers:{
      Authorization : `Bearer ${token}`,
    }
  })
}

export const updateEnquiry = (token,data)=>{
  return api.put('/enquiry/update',
  data,{
  headers:{
    Authorization : `Bearer ${token}`,
  }
})
}

export const deleteEnquiry = (token,id) =>{
  return api.delete(`/enquiry/delete/${id}`,{
    headers:{
      Authorization : `Bearer ${token}`,
    }
  })
}