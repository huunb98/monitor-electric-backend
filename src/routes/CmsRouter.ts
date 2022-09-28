import { Router } from 'express';
import { cmsController } from '../controllers/CmsController';
var CmsRouter = Router();

CmsRouter.post('/createSensor', (req, res) => {
  cmsController.createSensor(req, (err, rs) => {
    if (err) {
      res.status(400).send(err);
      return;
    } else res.send(rs);
  });
});

CmsRouter.post('/createGateway', (req, res) => {
  if (!req.body.gatewayId) {
    res.status(400).send('Invalid parameter');
    return;
  }
  cmsController.createGateway(req, (err, rs) => {
    if (err) {
      res.status(400).send(err);
      return;
    } else res.send(rs);
  });
});

CmsRouter.post('/createSystem', (req, res) => {
  cmsController.createSystem(req, (err, rs) => {
    if (err) {
      res.status(400).send(err);
      return;
    } else res.send(rs);
  });
});

CmsRouter.post('/updateGateway', (req, res) => {});
CmsRouter.post('/updateSensor', (req, res) => {});

export default CmsRouter;
