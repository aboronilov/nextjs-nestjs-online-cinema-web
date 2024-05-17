import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
console.log(projectDir)
loadEnvConfig(projectDir)

// export const API_URL = process.env.API_URL!
// export const API_URL = "https://nextjs-nestjs-online-cinema-web.onrender.com"
