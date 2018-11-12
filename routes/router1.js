module.exports= function(app){//app객체 이용
	var express=require('express');
	var route=express.Router();
	route.get('/r1', function(req,res){//router1 등록했으니 /p1/r1 대신 /r1만 써도 됨.
		res.send('Hi /p1/r1');
	});
	route.get('/r2', function(req,res){
		res.send('Hi /p1/r2');
	});
	
	//app객체를 이용할 수 있다.  그런데 http://localhost:3003/p3/r1하면 에러가 남.
	app.get('/p3/r1',function(req,res){
		res.send('Hi /p3/r1');
	});
	
	return route;
}