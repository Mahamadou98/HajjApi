const express = require('express');

const {
  getAllClient,
  createClient,
  getClient,
  updateClient,
  deleteClient,
} = require('./../controllers/clientController');

const router = express.Router();

router.route('/').get(getAllClient).post(createClient);
router.route('/:id').get(getClient).patch(updateClient).delete(deleteClient);

module.exports = router;
