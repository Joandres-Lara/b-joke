import { version as currentVersion } from "../package.json";
import VersionDetails from "@app/Messages/VersionDetails";
import path from "path";
import fs from "fs";
import eachFirstTextChannelOfServers from "@app/util/each-first-text-channel-of-servers";

let fileLastVersion = path.resolve("./last-version.cache"),
 lastVersion;

if (!fs.existsSync(fileLastVersion)) {
 lastVersion = "1.0.0";
} else {
 lastVersion = fs.readFileSync(fileLastVersion).toString();
}
/**
 *
 * @param {import("eris").CommandClient} bot
 */
export default function newVersionDetect(bot) {
 bot.on("ready", async () => {
  if (currentVersion !== lastVersion) {
   fs.writeFileSync(fileLastVersion, currentVersion);

   eachFirstTextChannelOfServers(bot, (channel) => {
    bot.createMessage(
     channel.id,
     new VersionDetails(currentVersion).toObject()
    );
   })
  }
 });
}
