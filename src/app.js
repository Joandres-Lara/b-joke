import Services from "./services";
/**
	* Configura la aplicación después de haberse conectado con el BOT.
	*
	* @param {*} bot
	*/
export default function app(bot){
		// CronJobs.configure(bot);
	Services.configure(bot)
}
