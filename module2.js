/*
//function sum(a,b)
var sum=function(a,b)
{
	return a+b;
}
*/
//사용자 모듈
var sum2=require('./lib/sum');
console.log('sum', sum2(1,2));

var cal=require('./lib/calculator');
console.log('cal sum', cal.sum(1,2));
console.log('cal avg', cal.avg(1,2));