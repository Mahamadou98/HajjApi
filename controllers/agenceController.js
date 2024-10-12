const Agence = require('../models/AgenceModel')

exports.getAllAgence = async (req, res) => {
  try {
    const agences = await Agence.find()

    res.status(200).json({
      statut: 'success',
      Total: agences.length,
      data: { agences },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.createAgence = async (req, res) => {
  try {
    const agence = await Agence.create(req.body)

    res.status(201).json({
      statut: 'success',
      data: { agence },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getAgence = async (req, res) => {
  try {
    const agence = await Agence.findById(req.params.id)

    res.status(200).json({
      statut: 'success',
      data: { agence },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.updateAgence = async (req, res) => {
  try {
    const agence = await Agence.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: 'success',
      data: { agence },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.deleteAgence = async (req, res) => {
  try {
    const agence = await Agence.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      data: { agence },
    })
  } catch (err) {
    res.status(404).json({
      success: 'fail',
      message: err,
    })
  }
}
