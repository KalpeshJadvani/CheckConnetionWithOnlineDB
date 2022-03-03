const express = require('express');
const router = express.Router();
const httpStatus = require('http-status');
const RESPONSE_TYPE_SUCCESS = 'success';
const RESPONSE_TYPE_ERROR = 'error';
const ALL_FILED_REQUERD = 'All fields required by value !';
const DATABASE_PROBLEM = 'Database Problem !';

router.get('/', (req, res, next) => {
   
        return res.status(httpStatus.OK).send({
          type: RESPONSE_TYPE_SUCCESS,
          data: { "DATA": "calling...."},
        });
      }
);

module.exports = router;
