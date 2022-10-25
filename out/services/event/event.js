"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const events_1 = require("events");
class EventService {
    constructor() {
        this.event = new events_1.EventEmitter();
    }
    onWarning(io) {
        this.event.on('warning', (message) => {
            console.log('on warning msg', message);
            io.sockets.emit('message', message);
        });
    }
    emitwarning(msg) {
        this.event.emit('warning', msg);
    }
}
exports.eventService = new EventService();
//# sourceMappingURL=event.js.map