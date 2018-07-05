var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/',function(req, res, next) {
    console.log('/process/login 처리!');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    req.session.user = {
        id : paramId,
        passsword : paramPassword
    }
    var user = req.session.user;

    if(user.id === 'www') {
        console.log(user.id);
        res.redirect('/');
    }else{
        res.writeHead('200', {
            "Content-Type":"text/html; charset=utf-8"
        });
        res.write("<h1>로그인 실패</h1>");
        res.write("<br><br><a href='/login'>로그인 페이지 돌아가기 </a>");
        res.end();
    }

});

module.exports = router;
