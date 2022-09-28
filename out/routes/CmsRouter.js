"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CmsController_1 = require("../controllers/CmsController");
var CmsRouter = (0, express_1.Router)();
CmsRouter.post('/createSensor', (req, res) => {
    CmsController_1.cmsController.createSensor(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createGateway', (req, res) => {
    if (!req.body.gatewayId) {
        res.status(400).send('Invalid parameter');
        return;
    }
    CmsController_1.cmsController.createGateway(req, (err, rs) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        else
            res.send(rs);
    });
});
CmsRouter.post('/createSystem', (req, res) => {
    CmsController_1.cmsController.createSystem(req, (err, rs) => {
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
//# sourceMappingURL=CmsRouter.js.map