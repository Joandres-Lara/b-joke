import randomNumberBetween from "@app/util/random-number-between";
import ServiceBot from "@services/service-bot";

let instance_service_bot;

beforeEach(() => {
 instance_service_bot = new ServiceBot().withoutMiddlewares();
});

test("Not called final callback if not call `next`", () => {

 const mockHandle = jest.fn(() => false);
 const mockFinalCalled = jest.fn();

 instance_service_bot.registerMiddleware({
  handle: mockHandle
 });

 instance_service_bot.applyMiddlewares(mockFinalCalled, true, false);

 expect(mockHandle).toHaveBeenCalled();
 expect(mockHandle).toHaveBeenCalledWith(expect.any(Function), true, false);

 expect(mockFinalCalled).not.toHaveBeenCalled();
});

test("Called final callback if call `next`", () => {

 const mockHandle = jest.fn((next) => next());
 const mockFinalCalled = jest.fn();

 instance_service_bot.registerMiddleware({
  handle: mockHandle
 });

 instance_service_bot.applyMiddlewares(mockFinalCalled, true, false);

 expect(mockHandle).toHaveBeenCalled();
 expect(mockHandle).toHaveBeenCalledWith(expect.any(Function), true, false);

 expect(mockFinalCalled).toHaveBeenCalled();
 expect(mockFinalCalled).toHaveBeenCalledWith(true, false);
});


test("Middlewares n count", () => {
 const mockHandle = jest.fn((next) => next());
 const middlewares = Array(randomNumberBetween(0, 20)).fill({ handle: mockHandle });
 const mockFinalCalled = jest.fn();

 instance_service_bot.registerMiddleware(...middlewares);
 instance_service_bot.applyMiddlewares(mockFinalCalled, true, false);

 expect(mockHandle).toHaveBeenCalledTimes(middlewares.length);
 expect(mockFinalCalled).toHaveBeenCalledWith(true, false);
});
