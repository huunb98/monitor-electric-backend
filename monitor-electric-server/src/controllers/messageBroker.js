"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageBroker = void 0;
const mqttBroker_1 = require("../services/broker/mqttBroker");
const messageController_1 = require("./messageController");
class MessageBroker extends mqttBroker_1.MqttControler {
    constructor(config) {
        super(config);
        this.initSubTopic(config);
    }
    initSubTopic(config) {
        console.log('init subscrible default topic like gateway/#');
        this.subscrible(config.gatewayTopic);
    }
    onMessageListener() {
        console.log('on message listenser');
        this.client.on('message', function (topic, payload) {
            messageController_1.messageController.getRawData(topic, payload);
        });
    }
}
exports.MessageBroker = MessageBroker;
//# sourceMappingURL=messageBroker.js.map