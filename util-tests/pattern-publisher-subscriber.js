const defaultMaped = (cb) => cb;

/**
 * Crea un patrón publisher subscriber.
 *
 * @param {function} mapedRegister
 * @param {function} mapedCall
 * @returns {object}
 */
module.exports = (mapedRegister = defaultMaped, mapedCall = defaultMaped) => {

 const listeners = [];

 const register = ((...args) => listeners.push(mapedRegister(...args)));

 register.listeners = listeners;

 const call = ((...args) => listeners.map(mapedCall).forEach((cb) => cb && cb(...args)));

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
