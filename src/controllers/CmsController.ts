import { GatewayModel } from '../models/gateway';
import { SensorModel } from '../models/sensor';
import { SystemModel } from '../models/system';
import { Request } from 'express';
import { GatewayConfigModel } from '../models/gatewayconfig';
import mongoose = require('mongoose');

class CmsController {
  createGateway(req: Request, callback: Function) {
    const { gatewayId, name, systemName, systemId, mqttStatus, description, config } = req.body;

    const gateway = new GatewayModel({
      gatewayId: gatewayId,
      name: name,
      description: description,
      systemId: new mongoose.Types.ObjectId(systemId),
      systemName: systemName,
      mqttStatus: +mqttStatus,
      config: new mongoose.Types.ObjectId(config),
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
    const { sensorId, sensorName, description, operationMode, connectStatus, systemId, gatewayId, thresHold, systemName, gatewayName } = req.body;

    const newSensor = new SensorModel({
      sensorId: sensorId,
      sensorName: sensorName,
      description: description,
      operationMode: operationMode,
      connectStatus: connectStatus,
      systemId: new mongoose.Types.ObjectId(systemId),
      gatewayId: gatewayId,
      systemName: systemName,
      gatewayName: gatewayName,
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

  createGatewayConfig(req: Request, callback: Function) {
    const { mqttHost, mqttPort, mqttTls, gatewayTopic, gatewayMsg, sensorTopic, sensorMsg } = req.body;

    const newConfig = new GatewayConfigModel({
      mqttHost: mqttHost,
      mqttPort: Number(mqttPort),
      mqttTls: mqttTls,
      gatewayTopic: gatewayTopic,
      gatewayMsg: gatewayMsg,
      sensorTopic: sensorTopic,
      sensorMsg: sensorMsg,
    });

    newConfig
      .save()
      .then((_) => {
        callback(null, 'Create Config Succeed');
      })
      .catch((error) => {
        console.log(error);
        callback(error.name, null);
      });
  }
}

export const cmsController = new CmsController();
