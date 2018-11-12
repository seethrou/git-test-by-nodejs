/*
	webserver.js처럼 node를 이용하여 직접 웹개발 할 수 있으나
	웹 프레임워크를 이용한 웹개발 express 	https://expressjs.com
	http://localhost:3000
	템플릿엔진 Jade npm install jade --save
	post를 위한 npm install body-parser  --save
	npm install supervisor -g (supervisor a.js instead of node a.js)
	파일업로드 npm install multer --save
*/

var express = require('express');
var app = express(); //app객체의 탄생
var bodyParser = require('body-parser');//for post

app.use(bodyParser.urlencoded({ extended: false }))//for post

var fs=require('fs');//nodejs 제공 파일시스템 제어 모듈

var multer = require('multer');//파일업로드 모듈 npm install multer --save

//var upload = multer({ dest:'uploads/'})
var _storage = multer.diskStorage({ //storage를 사용하면 기능 업그레이드. 여기서는 업로드 파일명을 실제파일명으로..
  destination: function (req, file, cb) {
    cb(null, 'uploads/');//한참 찾았다.'/uploads' -> 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
	//cb(null,file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: _storage })


app.locals.pretty = true; //소스보기 정돈되어 보여짐
app.set('view engine', 'jade');//view engine은 jade template
app.set('views', './views_file');//views 폴더는 views_files

//app.use(express.static('public'));//정적인 파일이 들어갈 위치 public(관습적임)를 지정함.
//http://localhost:3000/static.txt //public아래의 정적인 파일을 읽어올수 있음.
//http://localhost:3000/route.jpg  //public아래의 정적인 파일을 읽어올수 있음.




//mysql 설치 및  사용하기











//파일 업로드
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file.filename);
});
//upload.single('userfile') 는 미들웨어로 그 다음 함수실행 이전에 실행되어 req.file로 전달됨


//입력양식
app.get('/topic/new',function(req,res){
	res.render('new');//views_file/new.jade
});

app.post('/topic', function(req, res){//router 설정하고 그 안에 controller내용 넣는다.
  //controller
  var title = req.body.title; //cf. get req.query.title
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
	if(err){
		console.log(err);
		res.status(500).send('Internal Server Error111');//send가 실행되면 그 다음줄은 실행안됨
	}
	//res.send('Success!');
	res.redirect('/topic/' + title);
  });
});




//글 내용보기 + 목록보기 코드 개선
app.get(['/topic/:id','/topic'], function(req,res){
    //var id=req.params.id;//params?//아래로 이동. 이것이 있으면 topic/new와 충돌
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send가 실행되면 그 다음줄은 실행안됨
		}
		var id=req.params.id;//params?
		if(id){
			//id 있을 때
			fs.readFile('data/'+id, 'utf8', function(err,data){
				if(err){
					console.log(err);
					res.status(500).send('Internal Server Error333');
				}
				res.render('view',{topics:files, title:id, description:data});
			})
		}else{
			//id 없을 때
			res.render('view',{topics:files, title:'Wecome', description:"hello............"});
		}
	})
})
/*
//글 내용보기
app.get('/topic/:id', function(req,res){
	var id=req.params.id;//params?
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send가 실행되면 그 다음줄은 실행안됨
		}
		fs.readFile('data/'+id, 'utf8', function(err,data){
			if(err){
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			res.render('view',{topics:files, title:id, description:data});
		})
	})
})



//글목록 불러오기
app.get('/topic',function(req,res){
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send가 실행되면 그 다음줄은 실행안됨
		}
		res.render('view',{topics:files});
	});
});
*/







app.get('/', function(req, res){
  res.redirect('/topic');
});


app.listen(3000, function(){
    console.log('Conneted 3000 port!');//http://localhost:3000으로 확인
});