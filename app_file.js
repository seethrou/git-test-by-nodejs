/*
	webserver.jsó�� node�� �̿��Ͽ� ���� ������ �� �� ������
	�� �����ӿ�ũ�� �̿��� ������ express 	https://expressjs.com
	http://localhost:3000
	���ø����� Jade npm install jade --save
	post�� ���� npm install body-parser  --save
	npm install supervisor -g (supervisor a.js instead of node a.js)
	���Ͼ��ε� npm install multer --save
*/

var express = require('express');
var app = express(); //app��ü�� ź��
var bodyParser = require('body-parser');//for post

app.use(bodyParser.urlencoded({ extended: false }))//for post

var fs=require('fs');//nodejs ���� ���Ͻý��� ���� ���

var multer = require('multer');//���Ͼ��ε� ��� npm install multer --save

//var upload = multer({ dest:'uploads/'})
var _storage = multer.diskStorage({ //storage�� ����ϸ� ��� ���׷��̵�. ���⼭�� ���ε� ���ϸ��� �������ϸ�����..
  destination: function (req, file, cb) {
    cb(null, 'uploads/');//���� ã�Ҵ�.'/uploads' -> 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
	//cb(null,file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: _storage })


app.locals.pretty = true; //�ҽ����� �����Ǿ� ������
app.set('view engine', 'jade');//view engine�� jade template
app.set('views', './views_file');//views ������ views_files

//app.use(express.static('public'));//������ ������ �� ��ġ public(��������)�� ������.
//http://localhost:3000/static.txt //public�Ʒ��� ������ ������ �о�ü� ����.
//http://localhost:3000/route.jpg  //public�Ʒ��� ������ ������ �о�ü� ����.




//mysql ��ġ ��  ����ϱ�











//���� ���ε�
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('Uploaded : '+req.file.filename);
});
//upload.single('userfile') �� �̵����� �� ���� �Լ����� ������ ����Ǿ� req.file�� ���޵�


//�Է¾��
app.get('/topic/new',function(req,res){
	res.render('new');//views_file/new.jade
});

app.post('/topic', function(req, res){//router �����ϰ� �� �ȿ� controller���� �ִ´�.
  //controller
  var title = req.body.title; //cf. get req.query.title
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
	if(err){
		console.log(err);
		res.status(500).send('Internal Server Error111');//send�� ����Ǹ� �� �������� ����ȵ�
	}
	//res.send('Success!');
	res.redirect('/topic/' + title);
  });
});




//�� ���뺸�� + ��Ϻ��� �ڵ� ����
app.get(['/topic/:id','/topic'], function(req,res){
    //var id=req.params.id;//params?//�Ʒ��� �̵�. �̰��� ������ topic/new�� �浹
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send�� ����Ǹ� �� �������� ����ȵ�
		}
		var id=req.params.id;//params?
		if(id){
			//id ���� ��
			fs.readFile('data/'+id, 'utf8', function(err,data){
				if(err){
					console.log(err);
					res.status(500).send('Internal Server Error333');
				}
				res.render('view',{topics:files, title:id, description:data});
			})
		}else{
			//id ���� ��
			res.render('view',{topics:files, title:'Wecome', description:"hello............"});
		}
	})
})
/*
//�� ���뺸��
app.get('/topic/:id', function(req,res){
	var id=req.params.id;//params?
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send�� ����Ǹ� �� �������� ����ȵ�
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



//�۸�� �ҷ�����
app.get('/topic',function(req,res){
	fs.readdir('data', function(err,files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');//send�� ����Ǹ� �� �������� ����ȵ�
		}
		res.render('view',{topics:files});
	});
});
*/







app.get('/', function(req, res){
  res.redirect('/topic');
});


app.listen(3000, function(){
    console.log('Conneted 3000 port!');//http://localhost:3000���� Ȯ��
});