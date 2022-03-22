import { version as currentVersion } from "../package.json";
import VersionDetails from "@app/Messages/VersionDetails";
import path from "path";
import fs from "fs";

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
   const guilds = bot.guilds;

   guilds.forEach(async (guild) => {
    const channels = await bot.getRESTGuildChannels(guild.id);
    // TODO: Cambiar esto por una constante
    const firstChannel = channels.find((channel) => channel.type === 0);
    bot.createMessage(
     firstChannel.id,
     new VersionDetails(currentVersion).toObject()
    );
   });
  }
 });
}
