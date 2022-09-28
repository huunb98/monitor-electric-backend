import mqtt from 'mqtt';
const connectUrl = `mqtt://127.0.0.1:1883`;
const client = mqtt.connect({
  host: '127.0.0.1',
  port: 1883,
  protocol: 'mqtt',
});

client.on('connect', function () {
  console.log('connected');
  client.subscribe('gateway/#');
  setTimeout(() => {
    publish();
  }, 3000);
});

function publish() {
  for (let i = 0; i < 10; i++) {
    client.publish('gateway/sensor/15', `hello mqtt number ${i}`);
  }
}

client.on('message', function (topic, message) {
  console.log(message.toString());
  client.end();
});
