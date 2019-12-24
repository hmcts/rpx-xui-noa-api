import express from 'express';
import controller from './controller'
export default express.Router({ mergeParams: true })
    .post('/sendConfirmationRequest', controller.sendConfirmationRequest)
    .post('/sendConfirmComplete', controller.sendConfirmComplete);