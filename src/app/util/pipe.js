export default function pipe(value){
 return {
  pipe: (fn, ...args) => pipe(fn(value, ...args)),
  value: () => value
 }
}
