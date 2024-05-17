// export const API_URL = `${process.env.API_URL}/api`

export const getGenresUrl = (endpoint: string) => `/genre${endpoint}`
export const getAuthUrl = (endpoint: string) => `/auth${endpoint}`
export const getUserUrl = (endpoint: string) => `/user${endpoint}`
export const getMoviesUrl = (endpoint: string) => `/movie${endpoint}`
export const getActorsUrl = (endpoint: string) => `/actor${endpoint}`
export const getRatingsUrl = (endpoint: string) => `/rating${endpoint}`
