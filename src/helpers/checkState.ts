class BaseDevice {
  lastUpdate: number;
  disconnectCount: number = 0;
}
export class MapSensor extends BaseDevice {
  gateway: string;
}
export class MapGateway extends BaseDevice {
  sensor: Set<string> = new Set<string>();
}
