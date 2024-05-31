export const getRandomItems = <T>(arr: T[], n: number): T[] => {
  // Convert the array to a new array and sort it based on a random value
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random())
  // Return the first n items from the shuffled array
  return shuffled.slice(0, n)
}
