import pipe from "@app/util/pipe";
describe(".pipe", () => {
 test("Create pipe", () => {
  const fnPipe = jest.fn((arr, factor) => {
   return arr.map((val) => factor * val);
  });

  expect(
   pipe([1, 2, 3, 4])
   .pipe(fnPipe, 3)
   .value()
  ).toEqual([3, 6, 9, 12]);
 });

 test("Create more pipe", () => {
  const fnPipe = jest.fn((arr, factor) => {
   return arr.map((val) => factor * val);
  })
  expect(
   pipe([1, 2, 3, 4])
   .pipe(fnPipe, 8)
   .pipe(fnPipe, 1/2)
   .pipe(fnPipe, 1/2)
   .pipe(fnPipe, 1/2)
   .value()
  ).toEqual([1, 2, 3, 4])
 });
});
