export class NotifyWarning {
  sensorId: string;
  gatewayId: string;
  warningCode: number;
  msg: string;
  timeStamp: Date = new Date();
}
