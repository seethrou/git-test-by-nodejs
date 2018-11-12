var express=require('express');
var app=express();

/*
//application-level middleware?
app.get('/p1/r1', function(req,res){
	res.send('Hi /p1/r1');
});
app.get('/p1/r2', function(req,res){
	res.send('Hi /p1/r2');
});
app.get('/p2/r1', function(req,res){
	res.send('Hi /p2/r1');
});
app.get('/p2/r2', function(req,res){
	res.send('Hi /p2/r2');
});
*/

//라우트 분리하기 router-level middleware
/*
var router1=express.Router();
router1.get('/r1', function(req,res){//router1 등록했으니 /p1/r1 대신 /r1만 써도 됨.
	res.send('Hi /p1/r1');
});
router1.get('/r2', function(req,res){
	res.send('Hi /p1/r2');
});
*/
//var router1=require('./routes/router1');
var router1=require('./routes/router1')(app);//app객체이용. app값을 사용할 수 있게 됨.
app.use('/p1',router1);//router1 등록

/*
var router2=express.Router();
router2.get('/r1', function(req,res){
	res.send('Hi /p2/r1');
});
router2.get('/r2', function(req,res){
	res.send('Hi /p2/r2');
});
*/
var router2=require('./routes/router2');
app.use('/p2',router2);//router1 등록




app.listen(3003, function(){
	console.log('connected');
});