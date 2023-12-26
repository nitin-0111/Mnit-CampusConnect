// Service is solely for making http request , and sending the data back
import axios from 'axios'
import { BASE_URL } from '../../env'

const API_URL = BASE_URL 

// Register user
const register = async (userData) => {

    // Send a POST request to the API endpoint with the user data
    const response = await axios.post(API_URL + '/auth/register', userData)

   // If the response contains data (assuming it's the user data), store it in the local storage
   if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
   }
 
  // Return the data received from the server (which might include user information)
    return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/auth/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService