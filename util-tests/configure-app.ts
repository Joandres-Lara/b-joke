import Resolver from "@app/resolver/resolver";
import Eris from "eris";
import DefaultStorage from "@app/Storages/DefaultStorage";

export default function configureApp() {
 Resolver.set("bot", new Eris.CommandClient(process.env.TOKEN_BOT || "", {}));
 Resolver.set("storage", new DefaultStorage());
}