const defaultMaped = (cb) => cb;

module.exports = (mapedRegister = defaultMaped, mapedCall = defaultMaped) => {
	const listeners = [];

	const register = jest.fn((...args) => listeners.push(mapedRegister(...args)));
	const call = jest.fn((...args) => listeners.map(mapedCall).forEach((cb) => cb(...args)));
 const callFilter = (filter,...args) => listeners.filter(filter).map(mapedCall).forEach((cb) => cb(...args));

	return {
		register,
		call,
  callFilter
	}
}
