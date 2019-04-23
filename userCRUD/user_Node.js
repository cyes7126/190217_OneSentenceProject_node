var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mysql = require('mysql');



//db연결
var client = mysql.createConnection({
    host: '아마존인스턴스',
    user: 'bit2',
    password: '1234',
    database: 'onesentence'
});

//서버생성
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(52276, function () {
    console.log('server running..');
});

//라우터설정
app.get('/user', function (request, response) {
    fs.readFile('./list.html', 'utf-8', function (error, data) {
        client.query('select * from user_info', function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
app.get('/user/:userIdx', function (request, response) {
    fs.readFile('./list.html', 'utf-8', function (error, data) {
        client.query('select * from user_info where userIdx=?', [request.params.userIdx], function (error, results) {
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
app.get('/userInsert', function (request, response) {
    fs.readFile('insert.html', 'utf-8', function (error, data) {
        response.send(data);
    });
});
app.post('/user/:userEmail', function (request, response) {
    var body = request.body;
    client.query('insert into user_info(userEmail,userPassword,userName,userIntroduction) values (?,?,?,?)', [body.userEmail, body.userPassword, body.userName, body.userIntroduction],
        function (error, results) {
            response.send({
                userEmail: body.userEmail,
                userPassword: body.userPassword,
                userName: body.userName,
                userIntroduction: body.userIntroduction
            });


        });
});
app.get('/user/editForm/:userIdx', function (request, response) {
    fs.readFile('./edit.html', 'utf8', function (error, data) {
        client.query('select * from user_info where userIdx=?', [
            request.params.userIdx
        ], function (error, result) {
            response.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});
app.put('/user/:idx', function (request, response) {
    var body = request.body;
    client.query('update user_info set userEmail=?,userPassword=?,userName=?, userIntroduction=? where userIdx=?', [
        body.userEmail, body.userPassword, body.userName, body.userIntroduction, body.userIdx
    ], function (error, results) {
        response.send({
            userEmail: body.userEmail,
            userPassword: body.userPassword,
            userName: body.userName,
            userIntroduction: body.userIntroduction
        });
    });
});
app.delete('/user/:userIdx', function (request, response) {
    client.query('delete from user_info where userIdx=?', [request.params.userIdx], function (error, result) {
        if (error) {
            console.log('삭제실패');
        } else {
            response.send({
                'delete': 'success'
            });
        }
    });
});
