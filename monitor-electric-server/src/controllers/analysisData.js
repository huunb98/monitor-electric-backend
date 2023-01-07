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
exports.AnalysisData = void 0;
const sensorhistory_1 = require("../models/sensorhistory");
const analysisResults_1 = require("../helpers/analysisResults");
class AnalysisData {
    constructor() {
        this.sampleRate = 1;
    }
    getReport(sensorId, startDate, endDate, fields, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = new Date(startDate);
            let end = new Date(endDate);
            const lsField = fields.split(',');
            console.log(lsField);
            let rawData = yield this.getRawData(sensorId, start, end);
            let mapThresHold = {};
            for (const index of rawData) {
                for (const field of lsField) {
                    const value = Math.round(+index.log[field]);
                    if (mapThresHold[field]) {
                        let data = mapThresHold[field];
                        if (data[value]) {
                            let currentValue = data[value];
                            currentValue++;
                            data[value] = currentValue;
                        }
                        else
                            data[value] = 1;
                    }
                    else {
                        let data = {};
                        data[value] = 1;
                        mapThresHold[field] = data;
                    }
                }
            }
            const key = Object.keys(mapThresHold);
            let results = [];
            key.forEach((index) => {
                let sets = Object.keys(mapThresHold[index]);
                sets.forEach((set) => {
                    let result = new analysisResults_1.AnalysisResults();
                    result.field = index;
                    result.value = +set;
                    result.count = mapThresHold[index][set];
                    results.push(result);
                });
            });
            callback(null, results);
        });
    }
    getRawData(sensorId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resposne = yield sensorhistory_1.SensorHistoryModel.find({ sensorId: sensorId, timeStamp: { $gte: startDate, $lte: endDate } }, { _id: 0, log: 1 });
                return Promise.resolve(resposne);
            }
            catch (error) {
                return Promise.resolve([]);
            }
        });
    }
}
exports.AnalysisData = AnalysisData;
//# sourceMappingURL=analysisData.js.map