import CronParser from "@app/Parsers/CronParser";
import { advanceTo } from "jest-date-mock";
import parameters from "@util-tests/parsers.parameters";

describe("CronParser", () => {
 let parser;

 beforeEach(() => {
  parser = new CronParser();
 });

 test.each(parameters)("Parse '%s'", (...[strExpect, cronJobParseExpect,, frezzeDate = new Date(2020, 10, 10, 0, 0, 0)]) => {
  advanceTo(frezzeDate);
  expect(parser.parse(strExpect)).toEqual(cronJobParseExpect);
 });
});
