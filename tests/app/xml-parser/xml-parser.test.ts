import XMLNodeAdapter from "@app/xml-adapter/xml-node-adapter";
import XMLParseAdapter from "@app/xml-parser-adapter";

describe("class XMLNodeAdapter", () => {
 test("should parse xml and create XMLNodeAdapter instance", async () => {
  const xml = `
   <test>
    <foo>bar</foo>
   </test>
  `;

  const adapter = new XMLParseAdapter();
  const root = await adapter.parse(xml);

  expect(root).toBeInstanceOf(XMLNodeAdapter);
 });
});