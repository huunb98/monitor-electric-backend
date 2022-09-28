import { MqttControler } from '../services/broker/mqttBroker';
import { messageController } from './MessageControllter';

class MessageBroker extends MqttControler {
  constructor() {
    super();
    this.initSubTopic();
  }

  private initSubTopic() {
    console.log('init subscrible default topic like gateway/#');
    this.subscrible('gateway/#');
  }

  onMessageListener() {
    setTimeout(() => {
      console.log('publishh');
      this.client.publish('gateway/123/sensor/1234', 'hello mqtt');
    }, 3000);
    console.log('on message listenser');
    this.client.on('message', function (topic, payload) {
      messageController.getRawData(topic, payload);
      console.log(topic, payload.toString());
    });
  }
}

export const messageBroker = new MessageBroker();
