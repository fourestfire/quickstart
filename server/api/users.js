const router = require('express').Router()
// const {User} = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ['id', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })

const User = require('../db/models/user');
const Campus = require('../db/models/campus');

// we are currently at /api/users/

router.param('studentId', function(req, res, next, id) {
  User.findById(id)
  .then(student => {
    if (!student) res.sendStatus(404);
    else {
      req.student = student;
      next();
    }
  })
  .catch(next);
});

router.get('/', function(req, res, next) {
  User.findAll({ include: [{model: Campus}] })
  .then(data => res.json(data))
  .catch(next);
});

router.post('/', function(req, res, next) {
  User.create(req.body)
  .then(createdUser => User.findOne({
    where: { id: createdUser.id},
    include: [{model: Campus}]
  }))
  .then(data => res.json(data))
  .catch(next);
});

router.get('/:studentId', function(req, res, next) {
  res.send(req.student);
});

router.delete('/:studentId', function(req, res, next) {
  req.student.destroy()
  .then(res.sendStatus(204).bind(res))
  .catch(next);
});

router.put('/:studentId', function(req, res, next) {
  req.student.update(req.body)
  .then(updatedStudent => res.json(updatedStudent))
  .catch(next);
});

