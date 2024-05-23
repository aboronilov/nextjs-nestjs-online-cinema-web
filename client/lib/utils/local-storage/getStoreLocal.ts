export const getStoreLocal = (item: string) => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(item)
    return user ? JSON.parse(user) : null
  }
  return null
}
