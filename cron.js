// Cron job to hit endpoint every 14 sec to keep backend alive always
const cron = require("cron");
const https = require("https");

const backendUrl = "https://padhne-katha.onrender.com/";
const job = new cron.CronJob("0 */14 * * * *", function () {
  // This function will be executed every 14 minutes.
  console.log("Restarting server");

  // Perform an HTTPS GET request to hit any backend api.
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.error(
          `Failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during Restart:", err.message);
    });
});

// Export the cron job.
module.exports = {
  job,
};
