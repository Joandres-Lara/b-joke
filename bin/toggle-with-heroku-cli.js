import { exec as legacyExec } from "child_process";
import { endOfMonth, isAfter } from "date-fns";

async function exec(command) {
 return await new Promise((resolve, reject) => {
  legacyExec(command, (error, stout) => {
   if (error) return reject(error);
   return resolve(stout);
  });
 });
}

function ms({
 years = 0,
 days = 0,
 hours = 0,
 minutes = 0,
 seconds = 0,
}) {
 const transformers = {
  years: 1000 * 60 * 60 * 24 * 365,
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000,
  miliseconds: 1,
 };

 return (
  seconds * transformers.seconds +
  minutes * transformers.minutes +
  hours * transformers.hours +
  days * transformers.days +
  years * transformers.years
 );
}

const MATCH_STATUS_OFF = "No dynos on";

export default (async () => {
 try {
  let timerHerokuResponse;
  /** @type {string} */
  const stoutHerokuStatus = await Promise.race([
   exec("heroku ps"),
   new Promise((...[, reject]) => {
    timerHerokuResponse = setTimeout(() => {
     reject(
      new Error(
       "La petición ha tardado demasiado, revisa si la aplicación no necesita el token para iniciar sesión"
      )
     );
     process.exit();
    }, 10000);
   }),
  ]);

  clearTimeout(timerHerokuResponse);

  let result = "";

  const [, sHoursLeft, sMinutesLeft, sSecondsLeft] =
   /free dyno hours quota remaining this month\: (.*h)? (.*m)? (.*s)?/i.exec(
    stoutHerokuStatus
   );

  const dateEndOfMonth = endOfMonth(new Date());
  const dateLeftCalculateWithMiliseconds = new Date(
   new Date().getTime() +
    ms({
     hours: Number.parseInt(sHoursLeft || 0),
     minutes: Number.parseInt(sMinutesLeft || 0),
     seconds: Number.parseInt(sSecondsLeft || 0),
    })
  );

  const isOff = stoutHerokuStatus.indexOf(MATCH_STATUS_OFF) !== -1;

  if (isOff) {
   result = await exec("heroku ps:scale worker=1");
   console.log("Start bot B-Joke");
  } else if(isAfter(dateEndOfMonth, dateLeftCalculateWithMiliseconds)) {
   console.log(`Not found ${MATCH_STATUS_OFF} in ${stoutHerokuStatus}`);
   result = await exec("heroku ps:scale worker=0");
   console.log("Stop bot B-Joke");
  } else {
   console.info(
    "No es necesario apagar el bot, todo estará bien si se queda encendido"
   );
  }
  return result;
 } catch (e) {
  console.error(e);
 }
})();
