//import  express  from "express";
const express = require('express');
//import { home } from "../controllers/events";
let eventsController = require('../controllers/events')
let api = express.Router();
let event_name = 'boda4'

api.get(`/hola`, eventsController.home)
api.post(`/set-confirmation`, eventsController.setConfirmation)
// api.post(`/${event_name}/confirmation`, eventsController.setConfirmation)
api.get(`/list-confirmation`, eventsController.confirmationList)
// api.get(`/${event_name}/list-confirmation`, eventsController.confirmationList)
api.delete(`/delete-confirmation`, eventsController.deleteConfirmation)
module.exports = api