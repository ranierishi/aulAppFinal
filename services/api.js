import axios from 'axios'

const api = axios.create({baseURL: 'https://api-carros-aula.herokuapp.com/'})

export default api