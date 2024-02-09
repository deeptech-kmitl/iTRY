const cron = require("node-cron");

cron.schedule("* * * * *", () => {
  // Your task to be executed every minute goes here
  console.log("Cron job executed every minute");
});
