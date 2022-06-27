/**
 *
 */
export default function combineFns(...fns) {
 return (...args) =>
  fns. reduce(
   (returned, fn) => ({
    ...returned,
    ...fn(...args),
   }),
   {}
  );
}
