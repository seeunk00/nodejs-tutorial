const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://admin:bp93t6@cluster0.irzrs.mongodb.net/todoapp?retryWrites=true&w=majority', function(err, client){
	
	if(err) {
		return console.log('에러');
	}

	db = client.db('todoapp');

	// db.collection('post').insertOne( { 이름 : 'Tom', 나이 : 33, _id : 1 }, function(err, result){
	// 	console.log('저장완료');
	// });

	app.listen(8080, function(){
		console.log('listening on 8080');
	});	

});

// app.listen(8080, function(){
// 	console.log('listening on 8080');
// });

app.get('/pet', function(req, res){
	res.send('펫용품 쇼핑할 수 있는 페이지');
}); 

app.get('/beauty', function(req, res){
	res.send('뷰티용품 쇼핑할 수 있는 페이지');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
	res.sendFile(__dirname + '/write.html');
});

// app.post('/add', function(req, res){
// 	res.send('전송 완료');
// 	console.log(req.body);
// 	console.log(req.body.title);
// 	console.log(req.body.date);
// });

app.post('/add', function(req, res){
	res.send('전송 완료');
	console.log(req.body.date);
	console.log(req.body.title);

	// db.collection('post').insertOne( { 날짜 : req.body.date, 제목 : req.body.title }, function(err, result){
	// 	console.log('저장완료');
	// });
});

app.get('/list', function(req, res){

	db.collection('post').find().toArray(function(err, result){
		console.log(result);
		res.render('list.ejs', {posts : result});
	});
	
});