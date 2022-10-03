import mqtt from 'mqtt';
import { GateWayConfigResult } from '../../helpers/gatewayCfgResults';

export class MqttControler {
  protected client: mqtt.MqttClient;

  constructor(config: GateWayConfigResult) {
    this.initConection(config);
  }

  private initConection(config: GateWayConfigResult) {
    console.log('mqtt connect');
    this.client = mqtt.connect({
      host: config.host,
      port: config.port,
      protocol: 'mqtt',
    });
    setTimeout(() => {
      console.log(config);
      console.log(this.client.connected);
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

  disconnect() {
    console.log('client disconnected');
    this.client.end();
  }
}
