import type Services from "@services/Services";
import type Jobs from "@jobs/Jobs";
import Eris from "eris";
import type Express from "express";
import { Context } from "@app/interfaces/context";
import type BotInteractionUserSesion from "@app/bot-interaction-user-sesion/bot-interaction-user-sesion";
import type PostgresStorageManager from "@app/Storages/PostgresStorageManager";
import type Logger from "@app/Logger";

interface Instances {
 services?: Services,
 jobs?: Jobs,
 bot?: typeof Eris,
 http?: Express.Application,
 context?: Context,
 bot_session?: BotInteractionUserSesion,
 storage?: PostgresStorageManager,
 logger: Logger
};

export default class Resolver {
 /**
  * 
  */
 static instances: Instances = {};
 /**
  * 
  * @returns 
  */
 public static get<K extends keyof Instances>(key: K): Instances[K] {
  return Resolver.instances[key];
 }
 /**
  * 
  * @param key 
  * @param instance 
  */
 public static set<K extends keyof Instances, P extends Instances[K]>(key: K, instance: P): void {
  Resolver.instances[key] = instance;
 }
 /**
  * 
  * @param instances 
  */
 public constructor(instances: Instances) {
  Resolver.instances = instances;
 }
}