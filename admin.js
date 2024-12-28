const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Connecting...");
  await admin.connect();
  console.log("Connected!");
  await admin.createTopics({
    topics: [{ topic: "rider-updates", NumberPartitions: 2 }],
  });
  await admin.disconnect();
}

console.log("topic created");

console.log("disconnected");

init().catch(console.error);
