"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleJobControllter = void 0;
const deviceController_1 = require("./deviceController");
class ScheduleJobController {
    checkGateway() {
        console.log('job schedule');
        setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                deviceController_1.deviceController.checkStateGateway();
            });
        }, 50000);
    }
    checkSensor() {
        setInterval(function () {
            return __awaiter(this, void 0, void 0, function* () {
                deviceController_1.deviceController.checkStateSensor();
            });
        }, 30000);
    }
}
exports.scheduleJobControllter = new ScheduleJobController();
//# sourceMappingURL=scheduleJobController.js.map