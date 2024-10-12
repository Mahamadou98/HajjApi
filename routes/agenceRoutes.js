const express = require('express')
const { protect, restrictTo } = require('./../controllers/authController')
const {
  getAllAgence,
  createAgence,
  getAgence,
  updateAgence,
  deleteAgence,
} = require('./../controllers/agenceController')

const router = express.Router()

router.route('/').get(protect, getAllAgence).post(createAgence)

router
  .route('/:id')
  .get(getAgence)
  .patch(updateAgence)
  .delete(protect, restrictTo('admin'), deleteAgence)

module.exports = router
