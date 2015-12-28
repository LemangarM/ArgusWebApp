var leboncoin = require('./leboncoin.js');
var lacentrale = require('./lacentrale.js');
var express = require('express');
var app = express();

app.get('', function (req, res) {
  leboncoin.leboncoin(function(json){
    res.write('<!DOCTYPE html>'+
    '<html>'+
    '<style>'+
    'body {background:#FFFFFF ;padding:0px;margin:0px;font-family:Arial, Helvetica, sans-serif;}'+
    '#main_container {margin:0 auto;width:80%;margin-top:20px;}'+
    '#menu_container {width:100%;background-color:#000000;color:#FFF;font-size:14px;}'+
    '#menu_container .menu {width:80%;margin:0 auto;padding:5px;'+
    'font-weight:bold;text-transform:uppercase;}'+
    '#menu_container .menu ul {margin:0px;padding:0px;}'+
    '#menu_container .menu ul li {display:inline-block;padding-right:10px;'+
    'border-right:1px dotted #FFF;margin-right:10px;}'+
    ' #header {-webkit-border-radius: 10px;-moz-border-radius: 10px;'+
    'border-radius: 10px;background-color:#0000FF;color:'+
    '#fff;font-size:36px;padding:10px;font-weight:bold;margin-bottom:20px;'+
    'letter-spacing:-2px;text-align: center;};}'+
    '#banner {-webkit-border-radius: 10px;-moz-border-radius:10px;'+
    'border-radius: 10px;background-color:#666;color:#999;'+
    'font-size:48px;padding:50px 10px 50px 10px;font-weight:bold;'+
    'margin-bottom:20px;letter-spacing:-3px;text-align:center;}'+
    '#content_Area {-webkit-border-radius: 10px;-moz-border-radius: 10px;'+
    'border-radius: 10px;background-color:#CCC;'+
    'color:#333;font-size:16px;padding:10px;width:61%;float:left;}'+
    '#content_Area h1 {font-size:24px;font-weight:bold;}'+
    '#sidebar {display:inline-block;-webkit-border-radius: 10px;-moz-border-radius: 10px;'+
    'border-radius: 10px;background-color:#CCC;color:#333;font-size:16px;padding:10px;width:33%;'+
    'float:right;margin-left:1%;}'+
    '#footer {-webkit-border-radius: 10px;-moz-border-radius: 10px;'+
    'border-radius: 10px;background-color:#0000FF;color:'+
    '#fff;font-size:36px;padding:10px;font-weight:bold;margin-bottom:20px;'+
    'letter-spacing:-2px;text-align: center;}'+
    '</style>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
    '<title>Argus</title>'+
    '<link href="style.css" rel="stylesheet" type="text/css">'+
    '</head>'+
    '<body>'+
    '<div id="menu_container">'+
    '<div class="menu">'+
    '</div>'+
    '</div>'+
    '<div id="main_container">'+
    '<div id="header">Leboncoin Cars Analyser</div>'+
    '<div id="banner">'+
    '<img src="'+
     json.image +
    '" alt="exemple de texte alternatif" />'+
    '</div>'+
    '<div style="clear:both;"></div>'+
    '<div id="footer">Compare with this Results</div>'+
    '</div>'+
    '</body>'+
    '</html>');
    lacentrale.getargus(json, function(argusResult){
    //console.log(argusResult);
//res.end();
      for(var i=0;i<argusResult.length;i++){
        res.write('<b></br>'+argusResult[i].voiture + '      COTE : <strong>' + argusResult[i].cote +  '</strong></br></b>');
      };
    })
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Check your WebPage', host, port);
});
