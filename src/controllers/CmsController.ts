import { GatewayModel } from '../models/gateway';
import { SensorModel } from '../models/sensor';
import { SystemModel } from '../models/system';
import { Request } from 'express';

class CmsController {
  createGateway(req: Request, callback: Function) {
    const { gatewayId, name, systemName, mqttStatus, mqttIp, mqttPort, config } = req.body;

    const gateway = new GatewayModel({
      gatewayId: gatewayId,
      name: name,
      systemName: systemName,
      mqttStatus: mqttStatus,
      mqttIp: mqttIp,
      mqttPort: mqttPort,
      config: config,
    });

    gateway
      .save()
      .then((_) => {
        callback(null, 'Create GateWay Succees');
      })
      .catch((error) => {
        console.log(error);
        callback(error.name, null);
      });
  }

  updateGateway() {}

  createSensor(req: Request, callback: Function) {
    const { sensorId, sensorName, description, operationMode, connectStatus, systemId, gatewayId, thresHold } = req.body;

    const newSensor = new SensorModel({
      sensorId: sensorId,
      sensorName: sensorName,
      description: description,
      operationMode: operationMode,
      connectStatus: connectStatus,
      systemId: systemId,
      gatewayId: gatewayId,
      thresHold: thresHold,
    });

    newSensor
      .save()
      .then((_) => {
        callback(null, 'Create Sucess');
      })
      .catch((error) => {
        console.log(error);

        callback(error.name, null);
      });
  }

  updateSensor(req: Request, callback: Function) {}

  createSystem(req: Request, callback: Function) {
    const { name, description } = req.body;

    const newSystem = new SystemModel({
      name: name,
      description: description,
    });

    newSystem
      .save()
      .then((_) => callback(null, 'Create System Succeed'))
      .catch((error) => {
        console.log(error);
        callback(error.name, null);
      });
  }
}

export const cmsController = new CmsController();
