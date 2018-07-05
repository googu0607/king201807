var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginForm = require('./routes/loginForm');//로그인 폼으로 가는 경로 설정
var login = require('./routes/login');//로그인이 된 정보가 가는 경로
var signUpForm = require('./routes/signUpForm');//회원가입 폼으로 가는 경로
var signUpDB = require('./routes/signUpDB');//회원가입 데이터 베이스 보내기

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'mykey'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginForm);// /loginForm에 대한 실행페이지
app.use('/process/login', login);// /login에 대한 실행 페이지
app.use('/signUpForm', signUpForm);// 회원가입에 대한 실행 페이지
app.use('/process/signUp', signUpDB);// 회원가입에 대한 실행 페이지

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
