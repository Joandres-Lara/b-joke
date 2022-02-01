import { exec as legacyExec } from "child_process";

async function exec(command){
 return await(new Promise((resolve, reject) => {
  legacyExec(command, (error, stout) => {
   if(error) return reject(error);
   return resolve(stout);
  })
 }));
}

const MATCH_STATUS_OFF = "No dynos on";

(async () => {
 const stoutHerokuStatus = await exec("heroku ps");
 let result = "";

 if(stoutHerokuStatus.indexOf(MATCH_STATUS_OFF) !== -1){
  try{
   result = await exec("heroku ps:scale worker=1");
   console.log("Start bot B-Joke");
  }catch(e){
   console.error(e);
  }
 } else {
  console.log(`Not found ${MATCH_STATUS_OFF} in ${stoutHerokuStatus}`);
  try{
   result = await exec("heroku ps:scale worker=0");
   console.log("Stop bot B-Joke")
  }catch(e){
   console.error(e);
  }
 }
 console.info(result);
})()
