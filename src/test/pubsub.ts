import mqtt from 'mqtt';
const connectUrl = `mqtt://127.0.0.1:1883`;
import { msg } from './msg';
const client = mqtt.connect({
  host: 'broker.hivemq.com',
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
  client.publish('gateway/61c2ed64364da14c887a2e09/sensor/00:13:A2:00:41:D5:E0:50', JSON.stringify(msg));
}

client.on('message', function (topic, message) {
  console.log(message.toString());
  client.end();
});
