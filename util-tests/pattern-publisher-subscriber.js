const defaultMaped = (cb) => cb;

module.exports = (mapedRegister = defaultMaped, mapedCall = defaultMaped) => {
 const listeners = [];

 const register = jest.fn((...args) => listeners.push(mapedRegister(...args)));
 register.listeners = listeners;

 const call = jest.fn((...args) =>
  listeners.map(mapedCall).forEach((cb) => cb && cb(...args))
 );
 call.listeners = listeners;

 const callFilter = (filter, ...args) =>
  listeners
   .filter(filter)
   .map(mapedCall)
   .forEach((cb) => cb && cb(...args));
 callFilter.listeners = listeners;

 return {
  register,
  call,
  callFilter,
 };
};
