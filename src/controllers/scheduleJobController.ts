import schedule = require('node-schedule');

import { deviceController } from './deviceController';

class ScheduleJobController {
  checkGateway() {
    setInterval(async function () {
      deviceController.checkStateGateway();
    }, 50000);
  }

  checkSensor() {
    setInterval(async function () {
      deviceController.checkStateSensor();
    }, 20000);
  }
}
export const scheduleJobControllter = new ScheduleJobController();
