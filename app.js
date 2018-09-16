var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var logger = require("morgan");

var app = express();
 
 app.set("views" , path.resolve(__dirname, "views"));
 app.set("view engine" , "ejs");

var entries=[];
app.locals.entries= entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended:false}));

app.get('/' , function(req, res){
    res.render('index');
});

app.get('/new-entry' , function(req, res){
    res.render('new-entry');
});

app.post('/new-entry' , function(req, res){
    if(!req.body.title || !req.body.body ){
        res.sendStatus(404).send("There will be Title and Content must in Entries");
        return;
    }
    entries.push({
        title:req.body.title,
        content:req.body.title.body,
        published:new Date()
    })
    res.redirect('/');
});
app.use(function(req, res){
    res.sendStatus(404).render(404);
});


 http.createServer(app).listen(3000, function(){
     console.log("running on port");
 });
 