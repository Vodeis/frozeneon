import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getProducts = () => {
  return api.get('products?limit=100')
}
