/*
	자바스크립트 함수보다 풍부한 라이브러리 underscore 모듈사용하기 to search underscore at npmjs.com
	다양한 기능 확인 https://underscorejs.org/
	모듈 사용하기 전에 : npm init (프로젝트생성)
	npm install underscore --save(package.json dependencies에 추가되게 됨)
*/

var _=require('underscore');//underscore모듈 가져옴
var arr=[3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr));//underscore의 method first : 첫번째 인수 리턴
console.log(arr[arr.length-1]);
console.log(_.last(arr));