import { GateWayConfigResult } from '../../helpers/gatewayCfgResults';
import { GatewayConfigModel } from '../../models/gatewayconfig';
import { MessageBroker } from '../../controllers/messageBroker';

export let mapBroker: Map<string, MessageBroker> = new Map<string, MessageBroker>();

class InitConfig {
  async GetGateConfig(): Promise<GateWayConfigResult[]> {
    try {
      let response = await GatewayConfigModel.find({}).exec();
      let results: Array<GateWayConfigResult> = [];

      if (response) {
        for await (const index of response) {
          let rs = new GateWayConfigResult();
          rs.host = index.mqttHost;
          rs.port = index.mqttPort;
          rs.tls = index.mqttTls;

          rs.gatewayTopic = index.gatewayTopic;
          rs.gatewayMsg = index.gatewayMsg;
          rs.sensorTopic = index.sensorTopic;
          rs.sensorMsg = index.sensorMsg;

          results.push(rs);
        }
      }
      return Promise.resolve(results);
    } catch (error) {
      console.log(error);
      return Promise.resolve([]);
    }
  }
}

export var initSubTopic = async function () {
  const results = await new InitConfig().GetGateConfig();
  for (const index of results) {
    let broker = new MessageBroker(index);
    mapBroker.set(index.host, broker);
    mapBroker.get(index.host).onMessageListener();
  }
};
