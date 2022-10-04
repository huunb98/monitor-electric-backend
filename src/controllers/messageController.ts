import { IdResult } from '../helpers/idResults';
import { ConnectStatus, SensorModel } from '../models/sensor';
import { logController } from './logController';
import { mapBroker, initSubTopic } from '../services/database/initConfig';
import { MessageReportResults } from '../helpers/msgReportResults';
import { MsgWarning } from '../config/messageWarning';
import { WarningCode } from '../models/warninghistory';
import { SendReport } from '../services/mail/sendReport';
import { MapGateway, MapSensor } from '../helpers/checkState';
import { scheduleJobControllter } from './scheduleJobController';
import { deviceController } from './deviceController';
import { GatewayStatus } from '../models/gateway';

const sendReport = new SendReport();

export var mapGateway: Map<string, MapGateway> = new Map<string, MapGateway>();
export var mapSensor: Map<string, MapSensor> = new Map<string, MapSensor>();

class MessageController {
  constructor() {
    this.checkStateDevice();
  }

  async getRawData(topic: string, payload: any) {
    const msgReportResults = await this.getSensorAndMsg(topic, payload);

    if (msgReportResults) this.processMessage(msgReportResults);
  }

  private async getSensorAndMsg(topic: string, payload): Promise<MessageReportResults> {
    try {
      let msg = new MessageReportResults();
      let data = JSON.parse(payload);
      let key = Object.keys(data)[0];
      logController.logSensor(key, data[key]);

      const gateway = topic.split('/')[1];

      this.updateDevice(gateway, key);

      const result = data[key];

      msg.sensorId = key;
      msg.power = result.battery_level;
      msg.temp = result.temperature;
      msg.x_rms_ACC_mg = result.x_rms_ACC_mg;
      msg.x_max_ACC_mg = result.x_max_ACC_mg;
      msg.x_velocity_mm_sec = result.x_velocity_mm_sec;
      msg.x_displacement_mm = result.x_displacement_mm;
      msg.x_peak_one_Hz = result.x_peak_one_Hz;
      msg.x_peak_two_Hz = result.x_peak_two_Hz;
      msg.x_peak_three_Hz = result.x_peak_three_Hz;

      msg.y_rms_ACC_mg = result.y_rms_ACC_mg;
      msg.y_max_ACC_mg = result.y_max_ACC_mg;
      msg.y_velocity_mm_sec = result.y_velocity_mm_sec;
      msg.y_displacement_mm = result.y_displacement_mm;
      msg.y_peak_one_Hz = result.y_peak_one_Hz;
      msg.y_peak_two_Hz = result.y_peak_two_Hz;
      msg.y_peak_three_Hz = result.y_peak_three_Hz;

      msg.z_rms_ACC_mg = result.z_rms_ACC_mg;
      msg.z_max_ACC_mg = result.z_max_ACC_mg;
      msg.z_velocity_mm_sec = result.z_velocity_mm_sec;
      msg.z_displacement_mm = result.z_displacement_mm;
      msg.z_peak_one_Hz = result.z_peak_one_Hz;
      msg.z_peak_two_Hz = result.z_peak_two_Hz;
      msg.z_peak_three_Hz = result.z_peak_three_Hz;
      return Promise.resolve(msg);
    } catch (error) {
      console.log(error);
      return Promise.resolve(null);
    }
  }

  private updateDevice(gateway: string, sensor: string) {
    try {
      if (mapGateway.has(gateway)) {
        mapGateway.get(gateway).lastUpdate = Date.now();
        mapGateway.get(gateway).sensor.add(sensor);

        if (mapGateway.get(gateway).disconnectCount) {
          mapGateway.get(gateway).disconnectCount = 0;
          deviceController.changeStateGateway(gateway, GatewayStatus.Active);
        }
      } else {
        let gt = new MapGateway();
        gt.lastUpdate = Date.now();
        gt.sensor.add(sensor);
        mapGateway.set(gateway, gt);
        deviceController.changeStateGateway(gateway, GatewayStatus.Active);
      }

      if (mapSensor.has(sensor)) {
        mapSensor.get(sensor).lastUpdate = Date.now();
        if (mapSensor.get(sensor).disconnectCount) {
          mapSensor.get(sensor).disconnectCount = 0;
          deviceController.changeConnectStateSensor(sensor, ConnectStatus.Active);
        }
        mapSensor.get(sensor).disconnectCount = 0;
      } else {
        let ss = new MapSensor();
        ss.lastUpdate = Date.now();
        ss.gateway = gateway;
        mapSensor.set(sensor, ss);
        deviceController.changeConnectStateSensor(sensor, ConnectStatus.Active);
      }
    } catch (error) {
      console.log('-- update device error --', error);
    }
  }

  async processMessage(msg: MessageReportResults) {
    const thresHold = await this.getThresHold(msg.sensorId);
    if (thresHold) {
      let rs = '';
      let warningCode = WarningCode.None;
      if (msg.power < thresHold.power) {
        rs += MsgWarning.power + ': ' + msg.power + ' - ' + `${(msg.power / thresHold.power).toFixed(2)}%` + '\n';
        warningCode = WarningCode.BatteryLow;
      }
      if (msg.temp > thresHold.temp) {
        rs += MsgWarning.temp + ': ' + msg.temp + '\n';
        warningCode = WarningCode.OverTemp;
      }
      if (
        msg.x_rms_ACC_mg > thresHold.x.rmsAcc ||
        msg.x_max_ACC_mg > thresHold.x.maxAcc ||
        msg.x_velocity_mm_sec > thresHold.x.rmsVel ||
        msg.x_displacement_mm > thresHold.x.rmsDis ||
        msg.x_peak_one_Hz > thresHold.x.firstPeak ||
        msg.x_peak_two_Hz > thresHold.x.secondPeak ||
        msg.x_peak_three_Hz > thresHold.x.thirdPeak
      ) {
        rs += MsgWarning.x_rms_ACC_mg + '\n';
        warningCode = WarningCode.OverX;
      }
      if (
        msg.y_rms_ACC_mg > thresHold.y.rmsAcc ||
        msg.y_max_ACC_mg > thresHold.y.maxAcc ||
        msg.y_velocity_mm_sec > thresHold.y.rmsVel ||
        msg.y_displacement_mm > thresHold.y.rmsDis ||
        msg.y_peak_one_Hz > thresHold.y.firstPeak ||
        msg.y_peak_two_Hz > thresHold.y.secondPeak ||
        msg.y_peak_three_Hz > thresHold.y.thirdPeak
      ) {
        rs += MsgWarning.y_rms_ACC_mg + '\n';
        warningCode = WarningCode.OverY;
      }
      if (
        msg.z_rms_ACC_mg > thresHold.z.rmsAcc ||
        msg.z_max_ACC_mg > thresHold.z.maxAcc ||
        msg.z_velocity_mm_sec > thresHold.z.rmsVel ||
        msg.z_displacement_mm > thresHold.z.rmsDis ||
        msg.z_peak_one_Hz > thresHold.z.firstPeak ||
        msg.z_peak_two_Hz > thresHold.z.secondPeak ||
        msg.z_peak_three_Hz > thresHold.z.thirdPeak
      ) {
        rs += MsgWarning.z_rms_ACC_mg + '\n';
        warningCode = WarningCode.OverZ;
      }

      //  console.log(rs);
      if (rs) {
        logController.logWarning(msg.sensorId, warningCode, rs);
        let text = 'Hi Admin, \n';
        text += `System active not right - Sensor ${msg.sensorId} detected \n`;
        text += rs;
        text += '\nDeveloper Team';
        // sendReport.sendMailReport('Sensor Warning', text, 'badboy1998hh@gmail.com', null);
      }
      deviceController.changWarningSensor(msg.sensorId, warningCode);
    }
  }

  private async getThresHold(sensorId: string) {
    try {
      const results = await SensorModel.findOne({ _id: sensorId }, { thresHold: 1 }).exec();
      if (results) return results.thresHold;
      else return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  private processTopic(topic: string) {
    let list = topic.split('/');
    let result = new IdResult();
    if (list.length === 4) {
      result.Gateway = list[1];
      result.Sensor = list[3];
    }

    if (list.length === 2) {
      result.Gateway = list[1];
    }
    return result;
  }

  async reloadConfig() {
    console.log('----- Reload Config -----');
    mapBroker.forEach((value, key) => {
      value.disconnect();
      mapBroker.delete(key);
    });

    setTimeout(() => {
      initSubTopic();
    }, 3000);
  }

  /**
   * Job check state device
   */

  private checkStateDevice() {
    scheduleJobControllter.checkGateway();
    scheduleJobControllter.checkSensor();
  }
}

export const messageController = new MessageController();
