/**
 * 
 * @param {number} seconds
 * @returns {Promise<void>}
 */
export default async function wait(seconds: number) {
 return new Promise((resolve) => {
  setTimeout(resolve, seconds * 1000)
 })
}