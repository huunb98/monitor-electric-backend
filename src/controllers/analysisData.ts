import { ISensorHistoryDocument, SensorHistoryModel } from '../models/sensorhistory';

export class AnalysisData {
  async getReport(sensorId, startDate, endDate, fields, callback: Function) {
    let start = new Date(startDate);
    let end = new Date(endDate);

    const lsField = fields.split(',');
    console.log(lsField);
    let rawData = await this.getRawData(sensorId, start, end);

    let mapThresHold: Object = {};
    for (const index of rawData) {
      for (const field of lsField) {
        const value = parseInt(index.log[field]);
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
    callback(null, mapThresHold);
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
