import { parseStringPromise } from "xml2js";
import XMLNodeAdapter from "./xml-adapter/xml-node-adapter";

export default class XMLParseAdapter extends XMLNodeAdapter {
 /**
  * 
  * @type {unknown}
  */
 public current : unknown;
 /**
  * 
  * 
  */
 constructor() {
  super();
 }
 /**
  *
  * @param {*} xml
  * @returns
  */
 async parse(xml : string) {
  this.current = await parseStringPromise(xml);
  return this;
 }
}
