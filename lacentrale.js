var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports.getargus=function(json,callback){
  var chaine_url = "http://www.lacentrale.fr/cote-voitures-"+json.brand+"-"+json.model+"--"+json.releaseDate+"-.html";

  request(chaine_url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      var liste_voitures = $('[class="tdSD QuotMarque"]').each(function(){
        var voiture, cote;
        var argusResult=[];
        var $a = $(this).children('a');
        $(this).text();
        var url_lacentrale = "http://www.lacentrale.fr/"+ ($a.attr('href'));
        request(url_lacentrale, function(error, response, html){
          if(!error){
            var $2 = cheerio.load(html)
            cote = $2('[class="Result_Cote arial tx20"]').text().trim();
            argusResult.push({voiture : $a.text(), cote : cote});
            console.log(argusResult);
            callback(argusResult);
          }

        })
      });
    }
  })
}
