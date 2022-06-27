import eachOwnChannels from "@app/util/each-own-channels";
import randomNumberBetween from "@app/util/random-number-between";
import Message from "@app/Messages/Message";
import BaseJob from "./BaseJob";

export default class ManualJob extends BaseJob {
 /**
  * @type {string}
  */
 static PAGE_FACEBOOK_NAME = "CreicyGueimpleys";
 /**
  * @type {string}
  */
 static PAGE_FACEBOOK_LINK =
  "https://www.facebook.com/CreicyGueimpleys-113438323858561";

 /**
  * @returns {string}
  */
 static getLinkPageFacebook() {
  return `${ManualJob.PAGE_FACEBOOK_NAME}`;
 }

 static default_messages = [
  new Message(
   `Hey tu imbécil tienes que subir video a ${ManualJob.getLinkPageFacebook()}`
  ),
  new Message(
   `¿A quién chingada madre le tocada subir video en ${ManualJob.getLinkPageFacebook()}?`
  ),
  new Message(
   `Creo que a ${ManualJob.getLinkPageFacebook()} le están saliendo telarañas de tanto videos que tiene.`
  ),
  new Message(
   `¿Algún día tendremos video nuevo en ${ManualJob.getLinkPageFacebook()}?`
  ),
  new Message(
   `Como que se antoja un nuevo video en ${ManualJob.getLinkPageFacebook()}, lástima que yo no puedo subirlo.`
  ),
  new Message(
   `Aunque soy un bot, y estoy programado, yo si pongo los recordatorios, algo de ${ManualJob.getLinkPageFacebook()}, creo.`
  ),
  new Message(
   `Que calor, ¿y si subimos nuevo video en ${ManualJob.getLinkPageFacebook()}?, ¿no? ¿Soy sólo yo?`
  ),
  new Message(
   `Si los videos crecieran en árboles, ${ManualJob.getLinkPageFacebook()}, sería una papaya.`
  ),
  new Message(
   `${ManualJob.getLinkPageFacebook()} tiene más videos que besos le has dado a tu novia.`
  ),
  new Message(
   `Tienen que subir videos a ${ManualJob.getLinkPageFacebook()}, o me veré obligado a borrar la página.`
  ),
 ];

 /**
  *
  * @returns {Message[]}
  */
 static getDefaultMessages() {
  return ManualJob.default_messages;
 }
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {import("express").Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default} storageManager
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
 }
 /**
  *
  */
 async init() {
  this.initRandomJobs();
 }
 /**
  *
  */
 initRandomJobs() {
  this.initRandomMessagesByCreiciguempleis();
  this.initSpotifyRecord();
 }
 /**
  *
  */
 initRandomMessagesByCreiciguempleis() {
  // TODO: Random schedule of day maybe configure date timezone with timezone
  // of channel id localization.
  this.randomScheduleOfEachDay(() => {
   // Estos mensajes son para los recordarios de la página de Facebook
   eachOwnChannels(this.bot, (channel) => {
    const message =
     ManualJob.default_messages[
      randomNumberBetween(0, ManualJob.default_messages.length)
     ];

    this.sendMessage(channel.id, message);
   });
  });
 }
 /**
  *
  */
 initSpotifyRecord() {
  // Todos los días 10
  this.schedule(
   this.createRuleWithDefaultTimezone({
    second: 0,
    minute: 0,
    hour: 12,
    date: 11,
   }),
   () => {
    eachOwnChannels(this.bot, (channel) => {
     this.sendMessage(
      channel.id,
      new Message(
       "Se aproxima el día para pagar el Spotify, ¿a quién tengo que prestarle dinero?"
      )
     );
    });
   }
  );

  this.schedule(
   this.createRuleWithDefaultTimezone({
    second: 0,
    minute: 0,
    hour: 12,
    date: 12,
   }),
   () => {
    eachOwnChannels(this.bot, (channel) => {
     this.sendMessage(
      channel.id,
      new Message(
       "3 días para pagar el Spotify, vender tu cuerpo es una buena idea para conseguir el dinero, yo nada más digo"
      )
     );
    });
   }
  );

  this.schedule(
   this.createRuleWithDefaultTimezone({
    second: 0,
    minute: 0,
    hour: 12,
    date: 13,
   }),
   () => {
    eachOwnChannels(this.bot, (channel) => {
     this.sendMessage(
      channel.id,
      new Message(
       "2 días para pagar el Spotify, ¿qué tienes en esa bolsa de atrás? No importa, mientras tengas el dinero."
      )
     );
    });
   }
  );

  this.schedule(
   this.createRuleWithDefaultTimezone({
    second: 0,
    minute: 0,
    hour: 12,
    date: 14,
   }),
   () => {
    eachOwnChannels(this.bot, (channel) => {
     this.sendMessage(
      channel.id,
      new Message(
       "Mañana se paga el Spotify, espero que tengas el dinero, si no, espero que te gusten los lugares oscuros."
      )
     );
    });
   }
  );

  this.schedule(
   this.createRuleWithDefaultTimezone({
    second: 0,
    minute: 0,
    hour: 12,
    date: 15,
   }),
   () => {
    eachOwnChannels(this.bot, (channel) => {
     this.sendMessage(
      channel.id,
      new Message(
       "Llegó la hora de pagar el Spotify, quien no tenga el dinero, que ni salga, y ni se aparezca por aquí."
      )
     );
    });
   }
  );
 }
}
