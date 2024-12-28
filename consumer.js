const { kafka } = require("./client");

async function init() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });
  await consumer.run({
    eachMessage: ({ topic, partition, message }) => {
      console.log(topic, partition, message);
    },
  });
}
