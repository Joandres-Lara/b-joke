import eachFirstTextChannelOfServers from "@app/util/each-first-text-channel-of-servers";
import randomNumberBetween from "@app/util/random-number-between";
import BaseJob from "./BaseJob";

export default class ManualJob extends BaseJob {
 #default_messages = [
  "Hey tu imbécil tienes que subir video a CreicyGuempleis",
  "¿A quién chingada madre le tocada subir video en CreciyGuempleis?",
  "Creo que a CreciyGuempleis le están saliendo telarañas de tanto videos que tiene.",
  "¿Algún día tendremos video nuevo en CreciyGuempleis?",
  "Como que se antoja un nuevo video en CreciyGuempleis, lástima que yo no puedo subirlo.",
  "Aunque soy un bot, y estoy programado, yo si pongo los recordatorios, algo de CreciyGuempleis, creo.",
  "Que calor, ¿y si subimos nuevo video en CreciyGuempleis?, ¿no? ¿Soy sólo yo?",
  "Si los videos crecieran en árboles, CreciyGuempleis, sería una papaya.",
  "CreciyGuempleis tiene más videos que besos le has dado a tu novia.",
 ];
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {import("express").Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager").default} storageManager
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
 }

 async init() {
  this.randomScheduleOfDay(() => {
   eachFirstTextChannelOfServers(this.bot, (channel) => {
    this.sendMessage(
     channel.id,
     this.#default_messages[
      randomNumberBetween(0, this.#default_messages.length - 1)
     ]
    );
   });
  });
 }
}
