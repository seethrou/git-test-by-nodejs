/*
	�ڹٽ�ũ��Ʈ �Լ����� ǳ���� ���̺귯�� underscore ������ϱ� to search underscore at npmjs.com
	�پ��� ��� Ȯ�� https://underscorejs.org/
	��� ����ϱ� ���� : npm init (������Ʈ����)
	npm install underscore --save(package.json dependencies�� �߰��ǰ� ��)
*/

var _=require('underscore');//underscore��� ������
var arr=[3,6,9,1,12];
console.log(arr[0]);
console.log(_.first(arr));//underscore�� method first : ù��° �μ� ����
console.log(arr[arr.length-1]);
console.log(_.last(arr));