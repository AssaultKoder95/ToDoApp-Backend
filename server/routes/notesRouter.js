const NotesModel = require('../models/notes');
const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = express.Router();
const MSG = require('../../messages');
const CONFIG = require('../../config');

notesRouter.use(bodyParser.json());

notesRouter.route('/').get((req, res, next) => {
  NotesModel.find({}, {
    _id: 0,
    __v: 0,
    updatedAt: 0
  }).then((notes) => {
    if (notes.length) {
      res.statusCode = CONFIG.RESPONSE_CODE.SUCCESS;
      res.json(setResponse(CONFIG.RESPONSE_CODE.SUCCESS, true, MSG.SUCCESS, notes));
    } else {
      res.statusCode = CONFIG.RESPONSE_CODE.SUCCESS;
      res.json(setResponse(CONFIG.RESPONSE_CODE.SUCCESS, true, MSG.NO_DATA, notes));
    }
  }, (err) => {
    console.log(err);
    res.json(setResponse(CONFIG.RESPONSE_CODE.UNABLE_TO_PERFORM, false, MSG.GENERIC_ERROR));
  });
}).post((req, res, next) => {
  NotesModel.create(req.body).then((notes) => {
    let responseObject = {};
    let keys = Object.keys(CONFIG.RESPONSE_SUCCESS_OBJECT);
    keys.map((key) =>{
      if(notes[key])
        responseObject[key] = notes[key];
    })
    res.statusCode = CONFIG.RESPONSE_CODE.CREATED;
    res.json(setResponse(CONFIG.RESPONSE_CODE.CREATED, true, MSG.SUCCESS, responseObject));
  }, (err) => {
    console.log(err);
    res.json(setResponse(CONFIG.RESPONSE_CODE.UNABLE_TO_PERFORM, false, MSG.OPERATION_FAILED, err));
  });
}).put((req, res, next) => {
  res.statusCode = CONFIG.RESPONSE_CODE.UNABLE_TO_PERFORM;
  res.json(setResponse(CONFIG.RESPONSE_CODE.UNABLE_TO_PERFORM, false, MSG.OPERATION_NOT_SUPPORTED));
}).delete((req, res, next) => {
  NotesModel.remove({}).then((response) => {
    res.statusCode = CONFIG.RESPONSE_CODE.ACCEPTED;
    res.json(setResponse(CONFIG.RESPONSE_CODE.ACCEPTED, true, MSG.SUCCESS, response));
  }, (err) => {
    console.log(err);
    res.json(setResponse(CONFIG.RESPONSE_CODE.UNABLE_TO_PERFORM, false, MSG.GENERIC_ERROR));
  });
})

module.exports = notesRouter;
