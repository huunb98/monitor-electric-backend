import schedule = require('node-schedule');

import { deviceController } from './deviceController';

class ScheduleJobController {
  checkGateway() {
    console.log('job schedule');
    setInterval(async function () {
      deviceController.checkStateGateway();
    }, 50000);
  }

  checkSensor() {
    setInterval(async function () {
      deviceController.checkStateSensor();
    }, 30000);
  }
}
export const scheduleJobControllter = new ScheduleJobController();
