export default class Middleware{
 handle = (...args) => {
  const [next] = args.reverse();
  return next(...args);
 }
}
