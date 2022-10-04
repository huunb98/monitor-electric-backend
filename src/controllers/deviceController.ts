import { DisconectConfig } from '../config/disconnect';
import { GatewayModel, GatewayStatus } from '../models/gateway';
import { ConnectStatus, SensorModel } from '../models/sensor';
import { WarningCode } from '../models/warninghistory';
import { SendReport } from '../services/mail/sendReport';
import { logController } from './logController';
import { mapGateway, mapSensor } from './messageController';

class DeviceControllter {
  checkStateGateway() {
    const now = Date.now();

    mapGateway.forEach((value, key) => {
      if (now - value.lastUpdate > DisconectConfig.Gateway) {
        mapGateway.get(key).disconnectCount++;
        if (value.disconnectCount < 2) this.changeStateGateway(key, GatewayStatus.Disconnect);

        if (value.disconnectCount === 10 || value.disconnectCount < 2) {
          let msg = `Gateway ${key} disconected, check it now\n\nDeveloper Team`;
          console.log(msg);

          // new SendReport().sendMailReport('Gateway Disconect', msg, 'badboy1998hh@gmail.com', null);
        }
        if (value.disconnectCount > 20) {
          mapGateway.delete(key);
          console.log('delete cache gateway', key);
        }
      }
    });
  }

  checkStateSensor() {
    const now = Date.now();

    mapSensor.forEach((value, key) => {
      const gatewayState = now - mapGateway.get(value.gateway).lastUpdate < DisconectConfig.Gateway;

      if (now - value.lastUpdate >= DisconectConfig.Sensor && gatewayState) {
        mapSensor.get(key).disconnectCount++;
        // console.log('STATE SENSOR DISCONNECT ++');
        if (value.disconnectCount < 2) this.changeConnectStateSensor(key, ConnectStatus.DisconnectGateway);

        if (value.disconnectCount === 10 || value.disconnectCount < 2) {
          let msg = `Sensor ${key} disconected, check it now\n\nDeveloper Team`;
          console.log(msg);
          // new SendReport().sendMailReport('Sensor Disconect', msg, 'badboy1998hh@gmail.com', null);
        }
        if (value.disconnectCount > 20) {
          mapSensor.delete(key);
          console.log('delete cache sensor', key);
        }
      }
    });
  }

  changeStateGateway(id: string, mqttStatus: GatewayStatus) {
    GatewayModel.updateOne({ _id: id }, { $set: { mqttStatus: mqttStatus, connectStatus: mqttStatus } })
      .then((_) => console.log('Change State Gateway'))
      .catch((error) => console.log(error));
  }

  changeConnectStateSensor(id: string, state: ConnectStatus) {
    SensorModel.updateOne({ _id: id }, { $set: { connectStatus: state } })
      .then((_) => console.log('Change State Sensor'))
      .catch((error) => console.log(error));
  }

  changWarningSensor(id: string, code: WarningCode) {
    SensorModel.updateOne({ _id: id }, { $set: { warningCode: code } })
      .then((_) => console.log('Change State Sensor'))
      .catch((error) => console.log(error));
  }
}
export const deviceController = new DeviceControllter();
