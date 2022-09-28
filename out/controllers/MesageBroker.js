"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageBroker = void 0;
const mqttBroker_1 = require("../services/broker/mqttBroker");
const MessageControllter_1 = require("./MessageControllter");
class MessageBroker extends mqttBroker_1.MqttControler {
    constructor() {
        super();
        this.initSubTopic();
    }
    initSubTopic() {
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
            MessageControllter_1.messageController.getRawData(topic, payload);
            console.log(topic, payload.toString());
        });
    }
}
exports.messageBroker = new MessageBroker();
//# sourceMappingURL=MesageBroker.js.map