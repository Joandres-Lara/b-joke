export default function eachOwnChannels(bot, callback) {
 []
  .concat(
   process.env.NODE_ENV == "test"
    ? ["779580409884704770", "772296886089416727"]
    : []
  )
  .forEach((id) => {
   callback({ id });
  });
}
