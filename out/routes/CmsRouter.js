"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cmsController_1 = require("../controllers/cmsController");
var CmsRouter = (0, express_1.Router)();
CmsRouter.post('/createSensor', (req, res) => {
    cmsController_1.cmsController.createSensor(req, (err, rs) => {
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
    cmsController_1.cmsController.createGateway(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createSystem', (req, res) => {
    cmsController_1.cmsController.createSystem(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createConfig', (req, res) => {
    cmsController_1.cmsController.createGatewayConfig(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/reloadConfig', (req, res) => {
    cmsController_1.cmsController.reloadConfig((err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/updateGateway', (req, res) => { });
CmsRouter.post('/updateSensor', (req, res) => { });
exports.default = CmsRouter;
//# sourceMappingURL=cmsRouter.js.map