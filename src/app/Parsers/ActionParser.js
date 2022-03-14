import CronParser from "./CronParser";

export default class ActionParser {
 static INFINITIVE_WORDS = /ar$|er$|ir$/i;
 static VALID_WORDS = /recu[e|é]rda/i;

 error = null;

 constructor() {

 }
 /**
  *
  * @param {string} dirtyAction
  * @returns
  */
 #normalizeAction(dirtyAction){
  return dirtyAction[0].toUpperCase().concat(dirtyAction.slice(1))
 }
 /**
  *
  * @param {string[]} strs
  * @returns
  */
 parse(strs) {
  /** @type {string|null} */
  let action = null;

  const indexWord = strs.findIndex((s) =>
   ActionParser.INFINITIVE_WORDS.test(s)
  );

  if (indexWord !== -1) {
   action = strs.slice(indexWord).join(" ");
   return this.#normalizeAction(action);
  }

  let concatedStrs = strs.join(" ");

  if (CronParser.REGEXP_AT.test(concatedStrs)) {
   const result = CronParser.REGEXP_AT.exec(concatedStrs);
   const { index } = result;
   const [matchString] = result;
   action = concatedStrs.slice(index + matchString.length).trim();
   return this.#normalizeAction(action);
  }
 }

 hasError() {
  return this.error !== null;
 }

 getError() {
  return this.error instanceof Error ? this.error : new Error(this.error);
 }
}
