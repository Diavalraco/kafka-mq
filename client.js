const { Kafka } = require("kafkajs");

module.exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.1.8:9092"],
});
