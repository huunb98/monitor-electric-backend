import { WarningCode, WarningHistoryModel } from '../models/warninghistory';
import { SensorHistoryModel } from '../models/sensorhistory';

class LogController {
  logSensor(sensor: string, log: Map<string, any>) {
    const sensorHistory = new SensorHistoryModel({
      sensorId: sensor,
      log: log,
    });

    sensorHistory
      .save()
      .then((_) => console.log('save sensor history succeed'))
      .catch((_) => console.log('save sensor history error'));
  }

  logWarning(sensorId: string, warningCode: WarningCode, msg: string) {
    const warningHistory = new WarningHistoryModel({
      sensorId: sensorId,
      warningCode: warningCode,
      msg: msg,
    });
    warningHistory
      .save()
      .then((_) => console.log('save warning history succeed'))
      .catch((_) => console.log('save warning history error'));
  }
}

export const logController = new LogController();
