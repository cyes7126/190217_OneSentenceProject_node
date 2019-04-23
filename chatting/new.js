var mongojs = require('mongojs');
var db = mongojs('node');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var socketio = require('socket.io');
var cors = require('cors');
var http = require('http');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

var server = http.createServer(app).listen(52273,function(){
    console.log('서버시작되었습니다.');
});

var io = socketio.listen(server);

        io.sockets.on('connection', function (socket) {
            socket.on('join', function (data) {
                socket.join(data);
            });
            //message이벤트
            socket.on('message', function (data) {
                db.chat.save({
                    isbn: data.isbn,
                    userName: data.userName,
                    message: data.message,
                    time: data.time
                });
                io.sockets.in(data.isbn).emit('message', data);
            });
            socket.on('first',function(data){
               io.sockets.in(data.isbn).emit('first',data); 
            });


        });


app.post('/chat/:isbn', function (request, response) {
    var body = request.body;
    console.log(request.params.isbn);
    (function (error, result) {
        response.send({
            isbn: body.isbn,
            bookTitle: body.bookTitle,
            userName: body.userName
        });
    })();
});

app.get('/chat/:data', function (request, response) {
    fs.readFile('./mobile.html', 'utf-8', function (error, data) {
        var jsonData = JSON.parse(request.params.data);
        db.chat.find({
            isbn: jsonData.isbn
        }, function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                isbn: jsonData.isbn,
                bookTitle: jsonData.bookTitle,
                userName: jsonData.userName
            }));
        });

    });

});

app.get('/chatRoom/:isbn', function (request, response) {
    console.log('들어옴');
        db.chat.find({
            isbn: request.params.isbn
        }, function (error, results) {

            response.send({
                data:results             
             });
            console.log("결과값:"+JSON.stringify(results));
        });
    });

