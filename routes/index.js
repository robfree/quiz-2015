var express = require('express');
var router = express.Router();

// Controlador
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET /quizes/question
router.get('/quizes/question', quizController.question);

// GET /quizes/answer
router.get('/quizes/answer', quizController.answer);

// GET /author
router.get('/author', function(req, res, next){
  res.render('author', { title: 'Autor', author: 'Roberto Serrano Diaz-Grande'});
});

module.exports = router;
