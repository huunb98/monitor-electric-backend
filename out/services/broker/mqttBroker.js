"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttControler = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
class MqttControler {
    constructor(config) {
        this.initConection(config);
    }
    initConection(config) {
        console.log('mqtt connect');
        this.client = mqtt_1.default.connect({
            host: config.host,
            port: config.port,
            protocol: 'tcp',
        });
    }
    subscrible(topic) {
        this.client.subscribe(topic);
    }
    publish(topic, data) {
        this.client.publish(topic, data);
    }
    unsubscrible(topic) {
        this.client.unsubscribe(topic);
    }
    disconnect() {
        console.log('client disconnected');
        this.client.end();
    }
}
exports.MqttControler = MqttControler;
//# sourceMappingURL=mqttBroker.js.map