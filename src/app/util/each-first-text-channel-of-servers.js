/**
 *
 * @param {import("eris").CommandClient} bot
 * @param {{(c: import("eris").TextChannel) => void}} cb
 */
export default function eachFirstTextChannelOfServers(bot, cb){
 const guilds = bot.guilds;

 guilds.forEach(async (guild) => {
  const channels = await bot.getRESTGuildChannels(guild.id);
  // TODO: Cambiar 0 por una constante.
  const firstChannel = channels.find((channel) => channel.type === 0);
  cb(firstChannel);
 });
}
