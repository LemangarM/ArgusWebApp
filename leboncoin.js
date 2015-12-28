//var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports.leboncoin = function(callback){
  // L'url à scraper.
  url = 'http://www.leboncoin.fr/voitures/352314257.htm?ca=12_s';
   // La structure de notre demande d'appel
   // Le premier paramètre est notre URL
   // La fonction de rappel prend 3 paramètres, une erreur, la réponse et l'html
  request(url, function(error, response, html){
   // Vérification qu'aucune erreur ne s'est produites pendant la demande
      if(!error){
  // Utilisation de la bibliothèque cheerio sur le html retourné qui nous donne les fonctionnalité jQuery
          var $ = cheerio.load(html);
  // Définition des variables de capture.
          var phone, image, price, brand, model, releaseDate, mileage, fuel, gearbox;
          var json = { phone:"", image:"", price: "", brand : "", model : "", releaseDate : "", mileage: "", fuel: "", gearbox: "" };
  // passage de l'html
              image = $('[class="images"]').css( 'background-image' ).replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
              price = $("[itemprop='price']").attr("content");
              brand = $("[itemprop='brand']").text();
              model = $("[itemprop='model']").text();
              releaseDate = $("[itemprop='releaseDate']").text().replace(/^\s+|\s+$/g, "");
              //phone = $('[class="AdPhonenum"]').css( 'src' ).replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
              //json.phone=phone;
              json.image=image;
              json.price = price;
              json.brand = brand;
              json.model = model;
              json.releaseDate = releaseDate;

          $('.criterias').filter(function(){
  // Stocker les données dans une variable.
               var data = $(this);
  // En examinant les DOM, nous remarquons les positions des élements à rechercher.
  // En utilisant jQuery nous pouvons facilement naviguer et obtenir le texte en écrivant le code suivant:
             mileage = data.children().children().eq(4).children().last().text();
             fuel = data.children().children().eq(5).children().last().text();
             gearbox = data.children().children().eq(6).children().last().text();
  // quand on a les élements, on les stoke dans notre fichier JSON.
             json.mileage = mileage;
             json.fuel = fuel;
             json.gearbox = gearbox;
          })
       }
       callback(json);
       //console.log(brand);
       //req.session.json = json;
       /* fs.writeFile('leboncoin.json', JSON.stringify(json, null, 4), function(err){
      // console.log('Le fichier est généré avec succès! - Check your project directory for the leboncoin.json file');
      })*/
  }) ;
}



//leboncoin.listen('8081')
//console.log('Il s est passé des choses magique sur le port 8081');
//module.exports=leboncoin;
