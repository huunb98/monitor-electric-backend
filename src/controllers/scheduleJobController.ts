import schedule = require('node-schedule');
import { DisconectConfig } from '../config/disconnect';
import { deviceController } from './deviceController';
import { mapGateway, mapSensor } from './messageController';

class ScheduleJobController {
  checkGateway() {
    console.log('job schedule');
    setInterval(async function () {
      deviceController.checkStateGateway();
    }, 5000);
  }

  checkSensor() {
    setInterval(async function () {
      deviceController.checkStateSensor();
    }, 30000);
  }
}
export const scheduleJobControllter = new ScheduleJobController();
