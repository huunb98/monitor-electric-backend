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
        setTimeout(() => {
            this.client.publish('gateway/hn1231/sensor/2312h3ui', JSON.stringify({
                tmp: 50,
                rmax: 30,
            }));
        }, 3000);
        console.log('on message listenser');
        this.client.on('message', function (topic, payload) {
            messageController_1.messageController.getRawData(topic, payload);
        });
    }
}
exports.MessageBroker = MessageBroker;
//# sourceMappingURL=messageBroker.js.map