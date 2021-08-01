module.exports = (api) => {
 api.cache(true);

 return {
  presets: [
   require("@babel/preset-env", {
    targets: {
     node: "current",
    },
   }),
  ],
  ignore: ["src/**/*.spec.js", "src/**/*.test.js", "src/**/__mocks__"],
 };
};
