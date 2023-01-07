"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapGateway = exports.MapSensor = void 0;
class BaseDevice {
    constructor() {
        this.disconnectCount = 0;
    }
}
class MapSensor extends BaseDevice {
}
exports.MapSensor = MapSensor;
class MapGateway extends BaseDevice {
    constructor() {
        super(...arguments);
        this.sensor = new Set();
    }
}
exports.MapGateway = MapGateway;
//# sourceMappingURL=checkState.js.map