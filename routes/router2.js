var express=require('express');
var route=express.Router();
route.get('/r1', function(req,res){//router1 등록했으니 /p1/r1 대신 /r1만 써도 됨.
	res.send('Hi /p2/r1');
});
route.get('/r2', function(req,res){
	res.send('Hi /p2/r2');
});
module.exports=route;