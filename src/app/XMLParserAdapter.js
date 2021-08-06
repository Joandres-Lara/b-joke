import { parseStringPromise } from "xml2js";
import XMLNodeAdapter from "./XMLAdapter/XMLNodeAdapter";

export default class XMLParseAdapter extends XMLNodeAdapter{
 /**
  *
  */
 constructor(){
  super();
 }
 /**
  *
  * @param {*} xml
  * @returns
  */
 parse = async (xml) => {
  this.current = await parseStringPromise(xml);
  return this;
 }
}
