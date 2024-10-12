const Client = require('./../models/ClientModel');

exports.getAllClient = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({
      status: 'success',
      Total: clients.length,
      data: { clients },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);

    res.status(200).json({
      status: 'success',
      data: { client },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { client },
    });
  } catch (err) {
    res.status(404).json({
      success: 'fail',
      message: err,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { client },
    });
  } catch (err) {
    res.status(404).json({
      success: 'fail',
      message: err,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { client },
    });
  } catch (err) {
    res.status(404).json({
      success: 'fail',
      message: err,
    });
  }
};
