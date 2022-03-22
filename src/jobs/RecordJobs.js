import RecordActionMessage from "@app/Messages/RecordActionMessage";
import BaseJob from "./BaseJob";
import RecordJobSchedule from "./schedule-types/RecordJobSchedule";

export default class RecordJobs extends BaseJob {
 /**
  *
  * @param {import("eris").CommandClient} bot
  * @param {Express.Application} appExpress
  * @param {import("@app/Storages/PostgresStorageManager")} storageManager
  */
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
 }

 async init() {
  const jobs = await this.getAllJobs();
  jobs.forEach(this.queue.bind(this));
  this.storageJobs.onCreate(this.queue.bind(this));
  this.storageJobs.onCreate(console.log)
 }

 queue({ config, channel_id, user_id }){
  const { action, cron } = config;
  const [type, cronOrDate] = cron.split(",");
  this.logger.info(type, cronOrDate);
  if (type === "[date-unique]") {
   this.schedule(new Date(cronOrDate), () => {
    this.bot.createMessage(
     channel_id,
     new RecordActionMessage(action, user_id).toObject()
    );
   });
  }
 }
 /**
  *
  * @returns {Promise<import("src/models/channeljob").ChannelJob[]>}
  */
 getAllJobs() {
  return this.storageJobs.findAll({ job_type: RecordJobSchedule.TYPE });
 }
}
