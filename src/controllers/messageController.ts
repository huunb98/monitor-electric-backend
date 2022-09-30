import { IdResult } from '../helpers/idResults';
import { SensorModel, ThresHold } from '../models/sensor';
import { logController } from './logController';

class MessageController {
  getRawData(topic: string, payload: any) {
    const results = this.processTopic(topic);
    console.log(results);
    console.log('payload', JSON.parse(payload.toString()));
    if (results.Sensor) {
      this.processMessage(results.Sensor, JSON.parse(payload.toString()));
    }
  }

  async processMessage(sensorId: string, payload: Object) {
    logController.logSensor(sensorId, payload);

    const thresHold = await this.getThresHold(sensorId);
    if (thresHold) {
      //   console.log(thresHold);
    }
  }

  private async getThresHold(sensorId: string) {
    try {
      const results = await SensorModel.findOne({ sensorId: sensorId }, { thresHold: 1 }).exec();
      return results.thresHold;
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
}

export const messageController = new MessageController();
