import { GateWayConfigResult } from '../../helpers/gatewayCfgResults';
import { GatewayConfigModel } from '../../models/gatewayconfig';

export let listGatewayCfg: GateWayConfigResult[];

export class InitConfig {
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
      listGatewayCfg = results;
      return Promise.resolve(results);
    } catch (error) {
      console.log(error);
      return Promise.resolve([]);
    }
  }
}
