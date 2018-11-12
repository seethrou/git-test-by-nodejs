/*
	webserver.jsó�� node�� �̿��Ͽ� ���� ������ �� �� ������
	�� �����ӿ�ũ�� �̿��� ������ express 	https://expressjs.com
	http://localhost:3000
	���ø����� Jade npm install jade --save
	post�� ���� npm install body-parser  --save
	npm install supervisor -g (supervisor a.js instead of node a.js)
	���Ͼ��ε� npm install multer --save
	npm install mysql --save
*/

var express = require('express');
var app = express(); //app��ü�� ź��
var bodyParser = require('body-parser');//for post

app.use(bodyParser.urlencoded({ extended: false }))//for post

var fs=require('fs');//nodejs ���� ���Ͻý��� ���� ���

var mysql=require('mysql');


/*
var conn=mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '111111',
	database : 'o2'
});

var conn=mysql.createConnection({
	host : '222.122.157.218',
	user : 'webhard',
	password : '5827',
	port : 3306,
	database : 'webhard'
});
*/

var conn=mysql.createConnection({
	host : '222.122.157.218',
	user : 'webhard',
	password : '5827',
	port : 3306,
	database : 'webhard'
});
conn.connect();



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
//app.set('views', './views_file');//views ������ views_files
app.set('views', './views_mysql');//views ������ views_files

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





//edit
app.get(['/topic/:id/edit'], function(req,res){

	var sql='select * from topic';
	conn.query(sql,function(err,rows,fields){
		//res.send(rows);//�� ��µ��� üũ...
		var id=req.params.id;
		if(id){
			var sql='select * from topic where id=?';
			conn.query(sql,[id],function(err,rows2,fields02){
				if(err){
					console.log(err);
				}else{
					res.render('edit',{topics:rows,topic:rows2[0]});
				}
			});
		}else{
			console.log('No id');
			res.status(500).send('Internal Server Error');
		}
	});

})
app.post('/topic/:id/edit', function(req, res){//router �����ϰ� �� �ȿ� controller���� �ִ´�.
  //controller
  var title = req.body.title; //cf. get req.query.title
  var description = req.body.description;
  var author = req.body.author;
  var id=req.params.id;//params!!!
  
  var sql='update topic set title=?, description=?,author=? where id=?';
    //res.send(sql);
  
  conn.query(sql,[title,description,author,id],function(err,rows,fields){
	if(err){
		console.log(err);
		res.status(500).send('Internal Server Error111');//send�� ����Ǹ� �� �������� ����ȵ�
	}
	//res.send(rows);//���⿡�� insertId���� ������ �� ����. ���� ������?
	res.redirect('/topic/'+id);//������ insertId���� ������.
  });
});

app.get('/topic/:id/delete', function(req, res){//router �����ϰ� �� �ȿ� controller���� �ִ´�.
  //controller
 
 /*
  var id=req.params.id;
  var sql='delete from topic where id=?';
    //res.send(sql);
 
  conn.query(sql,[id],function(err,rows,fields){
	if(err){
		console.log(err);
		res.status(500).send('Internal Server Error111');//send�� ����Ǹ� �� �������� ����ȵ�
	}
	//res.send(rows);//���⿡�� insertId���� ������ �� ����. ���� ������?
	res.redirect('/topic/'+id);//������ insertId���� ������.
  });
  */
    var id=req.params.id;
  	var sql='select * from topic';
	conn.query(sql,function(err,rows,fields){
		var sql='select * from topic where id=?';
		conn.query(sql,[id],function(err,rows2,fields){
			if(err){
			}else{
				if(rows2.length==0){
				}else{
					//res.send(topic);
					res.render('delete',{topics:rows,topic:rows2[0]});
				}
			}
		});
	});
});


app.post('/topic/:id/delete', function(req, res){//router �����ϰ� �� �ȿ� controller���� �ִ´�.
  //controller
    var id=req.params.id;
  	var sql='delete from topic where id=?';
	conn.query(sql,[id],function(err,rows,fields){
			if(err){
			}else{
					//res.send(rows);
					res.redirect('/topic/');
			}
	});
});




//�Է¾��
app.get('/topic/add',function(req,res){

	var sql='select * from topic';
	conn.query(sql,function(err,rows,fields){
			res.render('add',{topics:rows});//views_mysql/add.jade
	});
	
});
app.post('/topic/add', function(req, res){//router �����ϰ� �� �ȿ� controller���� �ִ´�.
  //controller
  var title = req.body.title; //cf. get req.query.title
  var description = req.body.description;
  var author = req.body.author;
  
  var sql='insert into topic set title=?, description=?,author=?';
  //var sql='insert into topic (title,description,author) values(?,?,?)';
  conn.query(sql,[title,description,author],function(err,rows,fields){
	if(err){
		console.log(err);
		res.status(500).send('Internal Server Error111');//send�� ����Ǹ� �� �������� ����ȵ�
	}
	//res.send(rows);//���⿡�� insertId���� ������ �� ����. ���� ������?
	res.redirect('/topic/'+rows.insertId);//������ insertId���� ������.
  });
});




//�� ���뺸�� + ��Ϻ��� �ڵ� ����
app.get(['/topic/:id','/topic'], function(req,res){

	var sql='select * from topic';
	conn.query(sql,function(err,rows,fields){
		//res.send(rows);//�� ��µ��� üũ...
		var id=req.params.id;
		if(id){
			var sql='select * from topic where id=?';
			conn.query(sql,[id],function(err,rows2,fields02){
				if(err){
					console.log(err);
				}else{
					res.render('view',{topics:rows,topic:rows2[0]});
				}
			});
		}else{
			res.render('view',{topics:rows});
		}
	});

	
	
	/*
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
	*/
	
	
	
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