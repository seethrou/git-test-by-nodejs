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

//���Ʈ �и��ϱ� router-level middleware
/*
var router1=express.Router();
router1.get('/r1', function(req,res){//router1 ��������� /p1/r1 ��� /r1�� �ᵵ ��.
	res.send('Hi /p1/r1');
});
router1.get('/r2', function(req,res){
	res.send('Hi /p1/r2');
});
*/
//var router1=require('./routes/router1');
var router1=require('./routes/router1')(app);//app��ü�̿�. app���� ����� �� �ְ� ��.
app.use('/p1',router1);//router1 ���

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
app.use('/p2',router2);//router1 ���




app.listen(3003, function(){
	console.log('connected');
});