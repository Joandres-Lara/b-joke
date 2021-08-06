import PostgresStorageNewsItems from "./StorageNewsItems/PostgresStorageNewsItems";
import PostgresStorageJobs from "./StorageJobs/PostgresStorageJobs";
import DefaultStorage from "./DefaultStorage";

export default class PostgresStorageManager{
 constructor(){
  this.jobs = new PostgresStorageJobs();
  this.news_items = new PostgresStorageNewsItems();
 }
 /**
  *
  */
 async init(){
  return Promise.race([
   this.jobs.init(),
   this.news_items.init()
  ]);
 }
 /**
  *
  * @param {*} storageName
  * @returns {Storage}
  */
 get(storageName){
  switch(storageName){
   case "jobs":
    return this.jobs;
   case "news_items":
    return this.news_items;
   default:
    return new DefaultStorage();
  }
 }
}
