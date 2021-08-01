module.exports = (api) => {
 api.cache(true);

 const __TEST__ =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "testing";

 return {
  presets: [
   require("@babel/preset-env", {
    targets: {
     node: "current",
    },
    useBuiltIns: "usage"
   }),
  ],
  plugins: [
   require("@babel/plugin-transform-runtime"),
   require("@babel/plugin-transform-async-to-generator")
  ],
  ignore: __TEST__
   ? []
   : ["src/**/*.spec.js", "src/**/*.test.js", "src/**/__mocks__"],
 };
};
