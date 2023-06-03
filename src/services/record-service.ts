import ServiceBot from "./service-bot";
import {
 RECORD_COMMAND,
 RECORD_COMMAND_DESCRIPTION,
} from "./RecordService/descriptor-command";
import ErrorCronParseMessage from "@app/Messages/ErrorCronParseMessage";
import ErrorActionParseMessage from "@app/Messages/ErrorActionParseMessage";
import InvalidRecordMessage from "@app/Messages/InvalidRecordMessage";
import RecordJobSchedule from "@jobs/schedule-types/RecordJobSchedule";
import CronParser from "@app/Parsers/CronParser";
import ActionParser from "@app/Parsers/ActionParser";
import RecordSuccesfullyMessage from "@app/Messages/RecordSuccesfullyMessage";

export default class RecordService extends ServiceBot {
 // TODO: Cambiar esto por una interfaz, para la pruebas de integracion.
 /** @type {import("@app/Storages/StorageJobs/PostgresStorageJobs").default} */
 storageJobs;
 /** @type {import("@app/Parsers/ActionParser").default} */
 cron_parser;
 /** @type {import("@app/Parsers/CronParser").default} */
 action_parser;
 /**
  *
  */
 constructor(...args: any[]) {
  super(...args);
  this.storageJobs = this.resolve.get("storage")?.get("jobs");
  // this.cron_parser = new CronParser();
  // this.action_parser = new ActionParser();
 }
 /**
  * 
  * @param cron_parser 
  */
 setCronParser(cron_parser: CronParser){
  this.cron_parser = cron_parser
 }
 /**
  * 
  * @param action_parser 
  */
 setActionParser(action_parser: ActionParser){
  this.action_parser = action_parser;
 }
 /**
  * 
  */
 init() {
  this.registerCommand(
   RECORD_COMMAND,
   async (msg, args) => {
    const { channel, author } = msg;
    const { id: user_id } = author;
    const { id: channel_id } = channel;

    if (args.length > 0) {
     const arg = args.join(" ");
     const cron_job = this.cron_parser.parse(arg);
     const action = this.action_parser.parse(args);

     if (this.cron_parser.hasError()) {
      this.sendMessage(
       channel_id,
       new ErrorCronParseMessage(this.cron_parser.hasError())
      );
      this.cron_parser.resetError();
      return;
     }

     if (this.action_parser.hasError()) {
      this.sendMessage(
       channel_id,
       new ErrorActionParseMessage(this.action_parser.getError())
      );
      this.action_parser.resetError();
      return;
     }

     await this.appendActionJob({
      channel_id,
      user_id,
      cron_job,
      action,
     });

     this.sendMessage(
      channel_id,
      new RecordSuccesfullyMessage(user_id, cron_job, action)
     );

     return;
    }

    this.sendMessage(channel_id, new InvalidRecordMessage());
   },
   RECORD_COMMAND_DESCRIPTION
  );
 }
 /**
  * @param {{channel_id: string; user_id: string; action: string; cron_job: string;}} arg[0]
  */
 async appendActionJob({ channel_id, user_id, action, cron_job }) {
  return this.storageJobs.insert(
   new RecordJobSchedule(channel_id, user_id, { action, cron: cron_job })
  );
 }
}
