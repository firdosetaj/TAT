const express = require('express');
const app = express();
const quizRoute = express.Router();

// QuestionBank model
let QuestionBank = require('../models/QuestionBank');

// Add QuestionBank
quizRoute.route('/createQuiz').post((req, res, next) => {
  QuestionBank.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All QuestionBank
quizRoute.route('/').get((req, res) => {
  QuestionBank.aggregate( [{ $sample: { size: 5 } }],(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single QuestionBank
quizRoute.route('/read/:rowNum').get((req, res) => {
  QuestionBank.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).skip(Number(req.params.rowNum-1)).limit(1);
  
})

/**
// Update QuestionBank
quizRoute.route('/update/:id').put((req, res, next) => {
  QuestionBank.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete QuestionBank
quizRoute.route('/delete/:id').delete((req, res, next) => {
  QuestionBank.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
**/
module.exports = quizRoute;