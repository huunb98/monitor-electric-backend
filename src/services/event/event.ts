import { EventEmitter } from 'events';

class EventService {
  event: EventEmitter;

  constructor() {
    this.event = new EventEmitter();
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

export const eventService = new EventService();
