export const convertMongoDBDate = (date: string): string => {
  return new Date(date).toLocaleDateString("ru")
}
