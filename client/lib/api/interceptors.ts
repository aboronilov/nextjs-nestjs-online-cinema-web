// import { API_URL } from "@/config/env.config"
import axios from "axios"

const BASE_URL = "https://nextjs-nestjs-online-cinema-web.onrender.com"
const API_URL = `${BASE_URL}/api/`

export const axiosClassic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})
