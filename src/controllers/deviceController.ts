import { DisconectConfig } from '../config/disconnect';
import { titleWarning } from '../config/messageWarning';
import { GatewayModel, GatewayStatus } from '../models/gateway';
import { ConnectStatus, SensorModel } from '../models/sensor';
import { WarningCode } from '../models/warninghistory';
import { SendReport } from '../services/mail/sendReport';
import { mapGateway, mapSensor } from './messageController';

class DeviceControllter {
  checkStateGateway() {
    const now = Date.now();

    mapGateway.forEach((value, key) => {
      if (now - value.lastUpdate > DisconectConfig.Gateway) {
        mapGateway.get(key).disconnectCount++;
        if (value.disconnectCount < 2) this.changeStateGateway(key, GatewayStatus.Disconnect);

        if (value.disconnectCount === 10 || value.disconnectCount < 2) {
          let msg = `Gateway với ID ${key} mất kết nối. Đề nghị đơn vị kiểm tra!`;
          console.log(msg);

          new SendReport().sendMailReport(titleWarning, msg, 'nguyenkhue2608@gmail.com', null);
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
          let msg = `Sensor với ID ${key} mất kết nối. Đề nghị đơn vị kiểm tra!`;
          console.log(msg);
          new SendReport().sendMailReport(titleWarning, msg, 'nguyenkhue2608@gmail.com', null);
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
    SensorModel.updateOne({ sensorId: id }, { $set: { connectStatus: state } })
      .then((_) => console.log('Change State Sensor'))
      .catch((error) => console.log(error));
  }

  changWarningSensor(id: string, code: WarningCode) {
    SensorModel.updateOne({ sensorId: id }, { $set: { warningCode: code } })
      .then((_) => console.log('Change State Sensor'))
      .catch((error) => console.log(error));
  }

  updateBattery(id: string, value: number) {
    SensorModel.updateOne({ sensorId: id }, { $set: { currentPower: value } })
      .then((_) => console.log('Change State Sensor'))
      .catch((error) => console.log(error));
  }
}
export const deviceController = new DeviceControllter();
