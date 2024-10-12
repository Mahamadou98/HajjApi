const Cours = require('./../models/coursModel');

exports.getAllCours = async (req, res) => {
  try {
    const cours = await Cours.find();

    res.status(200).json({
      status: 'success',
      Total: cours.length,
      data: { cours },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCours = async (req, res) => {
  try {
    const cour = await Cours.create(req.body);

    res.status(200).json({
      status: 'success',
      data: { cour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCours = async (req, res) => {
  try {
    const cour = await Cours.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { cour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCours = async (req, res) => {
  try {
    const cour = await Cours.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { cour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCours = async (req, res) => {
  try {
    const cour = await Cours.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { cour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
