import JokeApiService from "./JokeApiService";

export default class Services{
	/**
		*
		* @param {*} bot
		* @returns {Services}
		*/
	static configure = (bot) => {
		return new Services(bot).init();
	}
	/**
		*
	 */
	services = [];
	/**
		*
		* @param {*} bot
		*/
	constructor(bot){
		this.services.push(
			new JokeApiService(bot)
		);
	}

	init = () => {
		this.services.forEach((service) => service.init())
	}
}
