export const getAssetUrl = (endpoint: string | undefined) => {
  if (!endpoint) return `${process.env.API_URL}`
  return `${process.env.API_URL}${endpoint}`
}
