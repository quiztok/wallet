//필요한 모듈 선언

var express = require('express');
var timeout = require('connect-timeout')
var http = require('http');
var app = express();
app.use(timeout('100s'))

//express 서버 포트 설정
app.set('port', process.env.PORT || 8131);

//서버 생성
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//라우팅 모듈 선언
var indexRouter = require('./routes/wallet');
var nftRouter =   require('./routes/nft');

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use('/api/wallet', indexRouter);
app.use('/api/nft',nftRouter);