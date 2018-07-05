var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var DB = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : 'bit33',
    database : 'test',
    debug : false
});

var addUser = function(name, id, password, tel, email,callback){
    console.log('addUser 호출');
    DB.getConnection(function (err,conn) {
        if(err){
            if(conn){
                conn.release();
            }
            callback(err,null);
            return;
        }
        console.log('데이터 베이스 연결 스레드 아이디: '+ conn.threadId);

        var data ={
            name : name,
            id : id,
            password : password,
            tel : tel,
            email : email
        }

        var exec = conn.query('INSERT INTO member SET ?', data, function(err, result){
            conn.release();
            console.log('실행 대상 SQL :'+ exec.sql);

            if(err){
                console.log('SQL 실행시 오류 발생');
                console.log(err);

                callback(err,null);

                return;
            }
            callback(null,result);
        });
    });
};
router.post('/', function(req, res, next) {
    console.log('회원가입에서 호출');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramTel = req.body.tel || req.query.tel;
    var paramEmail = req.body.email || req.query.email;

    console.log('요청 파라미터 : '+ paramId + paramPassword + paramName + paramTel + paramEmail);

    if(DB){
        addUser(paramName , paramId , paramPassword , paramTel , paramEmail,function(err, addedUser){
            if(err){
                console.log('사용자 추가중 오류발생 :' + err.stack);

                res.writeHead('200', {"Content-Type":"text/html; charset=utf-8"});
                res.write("<h1>사용자 추가중 오류발생</h1>");
                res.write('<p>'+ err.stack+'</p>');
                res.end();

                return;
            }

            if(addedUser){
                console.dir(addedUser);

                console.log('inserted ' + addedUser.affectedRows + 'rows');

                var insertId = addedUser.insertId;
                console.log('추가한 레코드의 아이디:' + insertId);

                res.redirect('/login');
            }else{
                res.redirect('/process/signUpForm');
            }
        });
    }else{
        res.write('200',{"Content-Type" : "text/html; charset=utf8"});
        res.write("<h2>데이터 베이스 연결 실패</h2>");
        res.end();
    }
});

module.exports = router;
