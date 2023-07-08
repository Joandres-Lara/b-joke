import { exec as legacyExec } from "child_process";
import { promisify } from "util";

export default function exec(command: string) {
 return new Promise((resolve, reject) => {
  legacyExec(command, (error, stout) => {
   if (error) return reject(error);
   return resolve(stout);
  });
 });
}