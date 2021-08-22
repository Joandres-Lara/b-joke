/**
 *
 * @param {int} min
 * @param {int} max
 * @returns {int}
 */
export default function randomNumberBetween(min, max){
 return (
  Math.floor(Math.random() * (max - min)) + min
 );
}
