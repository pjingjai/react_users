import axios from 'axios'
import { ENDPOINT } from "../config"

axios.defaults.baseURL = ENDPOINT

export default axios
