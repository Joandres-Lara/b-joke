import Resolver from "@app/resolver/resolver";
import Eris from "eris";
import DefaultStorage from "@app/Storages/DefaultStorage";
import Logger from "@app/Logger";

export default function configureApp() {
 Resolver.set("bot", new Eris.CommandClient(process.env.TOKEN_BOT || "", {}));
 Resolver.set("storage", {
  get: () => new DefaultStorage()
 });
 
 Resolver.set("logger", new Logger())
}