import { ISensorHistoryDocument, SensorHistoryModel } from '../models/sensorhistory';
import { AnalysisResults } from '../helpers/analysisResults';
import { SensorModel } from '../models/sensor';

export class AnalysisData {
  private sampleRate: number;
  constructor() {
    this.sampleRate = 1;
  }

  async getReport(sensorName, sensorId, startDate, endDate, fields, callback: Function) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    const lsField = fields.split(',');
    console.log(lsField);
    if (sensorName) sensorId = await this.genSensorId(sensorName);
    let rawData = await this.getRawData(sensorId, start, end);

    let mapThresHold: Object = {};
    for (const index of rawData) {
      for (const field of lsField) {
        const value = Math.round(+index.log[field]);
        if (value === 0) continue;
        if (mapThresHold[field]) {
          let data = mapThresHold[field];
          if (data[value]) {
            let currentValue = data[value];
            currentValue++;
            data[value] = currentValue;
          } else data[value] = 1;
        } else {
          let data = {};
          data[value] = 1;
          mapThresHold[field] = data;
        }
      }
    }
    const key = Object.keys(mapThresHold);

    let results: AnalysisResults[] = [];

    key.forEach((index) => {
      let sets = Object.keys(mapThresHold[index]);
      sets.forEach((set) => {
        let result = new AnalysisResults();
        result.field = index;
        result.value = +set;
        result.count = mapThresHold[index][set];
        results.push(result);
      });
    });

    callback(null, results);
  }

  async genSensorId(sensorName: string): Promise<string> {
    try {
      let data = await SensorModel.findOne({ sensorName: sensorName }, { sensorId: 1 });
      if (data) return Promise.resolve(data.sensorId);
      else return Promise.resolve('');
    } catch (error) {
      console.log(error);

      return Promise.resolve('');
    }
  }

  private async getRawData(sensorId: string, startDate: Date, endDate: Date): Promise<ISensorHistoryDocument[]> {
    try {
      let resposne = await SensorHistoryModel.find({ sensorId: sensorId, timeStamp: { $gte: startDate, $lte: endDate } }, { _id: 0, log: 1 });
      return Promise.resolve(resposne);
    } catch (error) {
      return Promise.resolve([]);
    }
  }
}
