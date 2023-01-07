"use strict";
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
CmsRouter.get('/analysData', (req, res) => {
    const { sensorId, start, end, fields } = req.query;
    if (!sensorId || !start || !end || !fields)
        return res.status(400).send('Invalid parameter!');
    new analysisData_1.AnalysisData().getReport(sensorId, start, end, fields, (error, reponse) => {
        if (error)
            return res.status(400).send(error);
        else
            res.send(reponse);
    });
});
exports.default = CmsRouter;
//# sourceMappingURL=cmsRouters.js.map