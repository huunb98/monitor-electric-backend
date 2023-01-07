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
const express_1 = require("express");
const analysisData_1 = require("../controllers/analysisData");
const cmsControllers_1 = require("../controllers/cmsControllers");
var CmsRouter = (0, express_1.Router)();
CmsRouter.post('/createSensor', (req, res) => {
    cmsControllers_1.cmsController.createSensor(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createGateway', (req, res) => {
    console.log('create gateway request');
    cmsControllers_1.cmsController.createGateway(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createSystem', (req, res) => {
    cmsControllers_1.cmsController.createSystem(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createConfig', (req, res) => {
    cmsControllers_1.cmsController.createGatewayConfig(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/reloadConfig', (req, res) => {
    cmsControllers_1.cmsController.reloadConfig((err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.get('/analysData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sensorId, start, end, fields, sensorName } = req.query;
    if (!start || !end || !fields)
        return res.status(400).send('Invalid parameter!');
    if (!sensorId && !sensorName)
        return res.status(400).send('Invalid parameter!');
    new analysisData_1.AnalysisData().getReport(sensorName, sensorId, start, end, fields, (error, reponse) => {
        if (error)
            return res.status(400).send(error);
        else
            res.send(reponse);
    });
}));
exports.default = CmsRouter;
//# sourceMappingURL=cmsRouters.js.map