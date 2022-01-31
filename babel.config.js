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
   require("@babel/plugin-transform-async-to-generator"),
   [
    require("babel-plugin-module-resolver"),
    {
     alias: {
      "@app": "./src/app",
      "@jobs": "./src/jobs",
      "@services": "./src/services",
      "@util-tests": "./util-tests"
     }
    }
   ]
  ],
  ignore: __TEST__
   ? []
   : ["src/**/*.spec.js", "src/**/*.test.js", "src/**/__mocks__"],
 };
};
