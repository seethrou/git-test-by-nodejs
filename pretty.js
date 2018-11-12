/*
	모듈과 NPM
	usage : to search uglify-js at npmjs.com 
	npm install uglify-js -g
	uglifyjs --help
	uglifyjs pretty.js
	uglifyjs pretty.js -m (-m, --mangle [option] by uglifyjs --help)
	uglifyjs pretty.js -m -o pretty.min.js (-o, --output <file>  by uglifyjs --help)
*/
function hello(name){
	console.log('Hi, '+name);
}
hello('now');
