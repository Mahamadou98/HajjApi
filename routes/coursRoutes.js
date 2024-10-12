const express = require('express');

const {
  getAllCours,
  createCours,
  getCours,
  updateCours,
  deleteCours,
} = require('./../controllers/coursController');

const router = express.Router();

router.route('/').get(getAllCours).post(createCours);

router.route('/:id').get(getCours).patch(updateCours).delete(deleteCours);

module.exports = router;
