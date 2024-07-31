import axois from 'axios'

const apiRequest = axois.create({
  baseURL : 'http://localhost:8800/api',
  withCredentials : true,
})

export default apiRequest