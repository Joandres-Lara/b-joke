import ServiceBot from "./ServiceBot";
import {
 RECORD_COMMAND,
 RECORD_COMMAND_DESCRIPTION,
} from "./RecordService/descriptor-command";
import ErrorCronParseMessage from "@app/Messages/ErrorCronParseMessage";
import CronParser from "@app/Parsers/CronParser";
import ActionParser from "@app/Parsers/ActionParser";

export default class RecordService extends ServiceBot {
 constructor(bot, appExpress, storageManager) {
  super(bot, appExpress, storageManager);
  this.storageJobs = storageManager.get("jobs");
  this.cron_parser = new CronParser();
  this.action_parser = new ActionParser();
 }

 init() {
  this.registerCommand(
   RECORD_COMMAND,
   async (msg, args) => {
    const { channel } = msg;
    const { id: channel_id } = channel;

    if (args.length > 0) {

     const [arg] = args[0];

     const cron_job = this.cron_parser.parse(arg);
     const action = this.action_parser.parse(arg);

     if (this.cron_parser.hasError()) {
      return this.sendMessage(
       channel_id,
       new ErrorCronParseMessage(this.cron_parser.getError())
      );
     }

     if(this.action_parser.hasError()){
      return this.sendMessage(
       channel_id,
       new ErrorActionParseMessage(this.action_parser.getError())
      );
     }

     console.log({ cron_job, action });
    }

    this.sendMessage(channel_id, new InvalidRecordMessage());
   },
   RECORD_COMMAND_DESCRIPTION
  );
 }

 subscribeChannel(channel_id) {
  return this.storageJobs.insertIfNotFind();
 }
}
