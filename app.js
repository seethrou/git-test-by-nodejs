/*
	webserver.jsó�� node�� �̿��Ͽ� ���� ������ �� �� ������
	�� �����ӿ�ũ�� �̿��� ������ express 	https://expressjs.com
	http://localhost:3000
	���ø����� Jade npm install jade --save http://expressjs.com/ko/guide/using-template-engines.html
	post�� ���� npm install body-parser  --save
	npm install supervisor -g (supervisor a.js instead of node a.js)
*/

var express = require('express');
var bodyParser = require('body-parser');//for post
var app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');//view engine(���ø�����)�� jade
app.set('views', './views');//views(���ø������� ��ġ�ϴ�  ����)�� views(����Ʈ views������ �״�� ����� �Ŷ�� �� ���� ��������). 

app.use(express.static('public'));//������ ����(���α׷����� ���ŵ��� �ʴ� ����)�� �� ��ġ public(��������)�� ������.
//http://expressjs.com/ko/starter/static-files.html
//http://localhost:3000/static.txt //public�Ʒ��� ������ ������ �о�ü� ����.
//http://localhost:3000/route.jpg  //public�Ʒ��� ������ ������ �о�ü� ����.


app.get('/form',function(req,res){
	res.render('form');//views/form.jade�� �о��. ������� ���� ���� send.
});



app.use(bodyParser.urlencoded({ extended: false }))//for post

app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});








app.get('/topic', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output);
})

app.get('/topic/:id', function(req, res){
  var topics = [
    'Javascript is....',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
})

app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
})



app.get('/template', function(req, res){
  res.render('temp', {time:Date(), title:'Jade'});
})

app.get('/route', function(req, res){
    res.send('Hello Router, <img src="/route.jpg">')
})

app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
  res.send(output);
});

app.get('/', function(req, res){
    res.send('Hello home page!!!!!');;
});



app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});