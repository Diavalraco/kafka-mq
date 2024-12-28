const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer();
  await producer.connect();
  rl.setprompt(">");
  rl.prompt();
  rl.on("line", async (line) => {
    await producer.send({
      topic: "rider-updates",
      messages: [{ value: line }],
    });
    rl.prompt();
  });
  await producer.send({
    topic: "rider-updates",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.disconnect();
}

async function consume() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received on topic "${topic}" partition "${partition}":`,
        message.value.toString()
      );
    },
  });
}
