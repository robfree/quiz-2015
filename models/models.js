var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:post/database
// SQlite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6] || null);
var user      = (url[2] || null);
var pwd       = (url[3] || null);
var protocol  = (url[1] || null);
var dialect   = (url[1] || null);
var port      = (url[5] || null);
var host      = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQlite

var sequelize = new Sequelize(DB_name, user, pwd,
                      { dialect: protocol,
                        protocol: protocol,
                        port: port,
                        host: host,
                        storage: storage, // solo SQlite (.env)
                        omitNull: true    // solo Psotgres
                      }
                    );
// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Comment
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;  // exportar la definicion de tabla Quiz
exports.Comment = Comment;
// sequelize.sync() crea e inicilaliza tabla de preguntas
sequelize.sync().then(function(){
  Quiz.count().then(function(count){
    if (count === 0) {
      Quiz.create( {pregunta: 'Capital de Italia', respuesta: 'Roma', tema: 'Humanidades'} );
      Quiz.create( {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'Humanidades'} )
      .then(function(){
        console.log('Base de Datos inicializada');
      });
    };
  });
});
