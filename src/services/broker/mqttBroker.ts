import mqtt from 'mqtt';

export class MqttControler {
  protected client: mqtt.MqttClient;

  constructor() {
    this.intiConection();
  }

  private intiConection() {
    console.log('mqtt connect');
    this.client = mqtt.connect({
      host: '127.0.0.1',
      port: 1883,
      protocol: 'mqtt',
    });
  }

  protected subscrible(topic: string) {
    this.client.subscribe(topic);
  }

  protected publish(topic: string, data) {
    this.client.publish(topic, data);
  }

  protected unsubscrible(topic: string) {
    this.client.unsubscribe(topic);
  }
}
