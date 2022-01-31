import { exec as legacyExec } from "child_process";

async function exec(command){
 return await(new Promise((resolve, reject) => {
  legacyExec(command, (error, stout) => {
   if(error) return reject(error);
   return resolve(stout);
  })
 }));
}

(async () => {
 const stoutHerokuStatus = await exec("heroku status");
 let result = "";

 if(stoutHerokuStatus.indexOf("No known issues at this time") !== -1){
  try{
   result = await exec("heroku ps:restart b-joke");
  }catch(e){
   console.error(e);
  }
 } else {
  try{
   result = await exec("heroku ps:stop b-joke");
  }catch(e){
   console.error(e);
  }
 }
 console.info(result);
})()
