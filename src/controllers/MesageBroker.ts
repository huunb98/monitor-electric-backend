import { GateWayConfigResult } from '../helpers/gatewayCfgResults';
import { MqttControler } from '../services/broker/mqttBroker';
import { messageController } from './messageController';

export class MessageBroker extends MqttControler {
  constructor(config: GateWayConfigResult) {
    super(config);
    this.initSubTopic(config);
  }

  private initSubTopic(config: GateWayConfigResult) {
    console.log('init subscrible default topic like gateway/#');
    this.subscrible(config.gatewayTopic);
  }

  onMessageListener() {
    setTimeout(() => {
      this.client.publish(
        'gateway/hn1231/sensor/2312h3ui',
        JSON.stringify({
          tmp: 50,
          rmax: 30,
        })
      );
    }, 3000);
    console.log('on message listenser');
    this.client.on('message', function (topic, payload) {
      messageController.getRawData(topic, payload);
    });
  }
}
