const express=require('express');
const path =require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open',function(){
  console.log('connected to mongodb');
});

//check for db errors
db.on('error',function(err){
  console.log('err');
});

//init app
const app=express();

//bring in models
let Article = require('./models/article');

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

//bodyparser
app.use(bodyParser.urlencoded({ extended: false}))
//jso
app.use(bodyParser.json())

//home route
app.get('/',function(req,res){
  Article.find({},function(err, articles){
    if(err){
      console.log(err);
    } else {
    res.render('index4',{
      title:'Articles',
      articles: articles
    });
  }
  });
});

//add route
app.get('/articles/add',function(req, res){
  res.render('add_articles',{
    title:'Add Article'
  });
});

//add Submit
app.post('/articles/add',function(req,res){
  let article=new Article();
  article.title=req.body.title;
  article.author=req.body.author;
  article.body=req.body.body;

  article.save(function(err){
   if(err){
    console.log('err');
    return;
  } else{
  res.redirect('/');
    }
  });
});

//start server
app.listen(3000,function(){
  console.log('Server started on port 3000...');
});
