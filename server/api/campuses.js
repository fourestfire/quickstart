'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;

const Student = require('../db/models/user');
const Campus = require('../db/models/campus');

// we are currently at /api/campuses/

router.param('campusId', function(req, res, next, id) {
  Campus.findById(id)
  .then(campus => {
    if (!campus) res.sendStatus(404);
    else {
      req.campus = campus;
      next();
    }
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  Campus.findAll()
  .then(data => res.json(data))
  .catch(next);
});

router.post('/', function(req, res, next) {
  Campus.create(req.body)
  .then(data => res.json(data))
  .catch(next);
});

// modified the route here to better serve the front end functionality - instead of sending back the campus, we want to send back the students for that campusId
// router.get('/:campusId', function(req, res, next) {
//   res.send(req.campus);
// });
router.get('/:campusId', function(req, res, next) {
  Student.findAll({
    where: { campusId: req.params.campusId },
    include: [{model: Campus}]
  })
  .then(data => res.json(data))
  .catch(next);
});

router.delete('/:campusId', function(req, res, next) {
  req.campus.destroy()
  .then(res.sendStatus(204).bind(res))
  .catch(next);
});

router.put('/:campusId', function(req, res, next) {
  req.campus.update(req.body)
  .then(updatedCampus => res.json(updatedCampus))
  .catch(next);
});

