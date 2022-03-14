import ActionParser from "@app/Parsers/ActionParser";
import parameters from "@util-tests/parsers.parameters";
describe("ActionParser", () => {
 /** @type {ActionParser} */
 let action;

 beforeEach(() => {
  action = new ActionParser();
 });

 test.each(parameters)("Parse %s", (...[strParse,, actionParserExpect]) => {
  expect(action.parse(strParse.split(" "))).toEqual(actionParserExpect);
 });
});
