import express from 'express';
import controller from './controller'
export default express.Router({ mergeParams: true })
    .post('/create/:caseid/:email', controller.create)
    .post('/confirm/:uuid', controller.confirm);