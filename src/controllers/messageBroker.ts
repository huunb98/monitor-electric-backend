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
    console.log('on message listenser');
    this.client.on('message', function (topic, payload) {
      messageController.getRawData(topic, payload);
    });
  }
}
