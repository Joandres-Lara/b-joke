module.exports = {
 apps: [
  {
   name: "b-joke",
   script: "dist/index.js",
   args: "--desactive-log",
   instances: "1",
   watch: ".",
   env: {
    NODE_ENV: "development",
   },
   env_production: {
    NODE_ENV: "production",
    DATABASE_URL: process.env.DATABASE_URL
   },
  },
 ],

 deploy: {
  production: {
   user: "SSH_USERNAME",
   host: "SSH_HOSTMACHINE",
   ref: "origin/master",
   repo: "GIT_REPOSITORY",
   path: "DESTINATION_PATH",
   "pre-deploy-local": "",
   "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production",
   "pre-setup": "",
  },
 },
};
