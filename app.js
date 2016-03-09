(function(){
   "use strict";

   var Autopark = function(){

     // SEE ON SINGLETON PATTERN
     if(Autopark.instance){
       return Autopark.instance;
     }
     //this viitab Moosipurk fn
     Autopark.instance = this;

     this.routes = Autopark.routes;
     // this.routes['home-view'].render()

     console.log('autopargi sees');

     // KÃ•IK muuutujad, mida muudetakse ja on rakendusega seotud defineeritakse siin
     this.click_count = 0;
     this.currentRoute = null;
     console.log(this);

     // hakkan hoidma kÃµiki purke
     this.cars = [];

     // Kui tahan Moosipurgile referenci siis kasutan THIS = MOOSIPURGI RAKENDUS ISE
     this.init();
   };

   window.Autopark = Autopark; // Paneme muuutja kÃ¼lge

   Autopark.routes = {
     'home-view': {
       'render': function(){
         // kÃ¤ivitame siis kui lehte laeme
         console.log('>>>>avaleht');
       }
     },
     'list-view': {
       'render': function(){
         // kÃ¤ivitame siis kui lehte laeme
         console.log('>>>>loend');

         //simulatsioon laeb kaua

       }
     },
     'manage-view': {
       'render': function(){
         // kÃ¤ivitame siis kui lehte laeme
       }
     }
   };

   // KÃµik funktsioonid lÃ¤hevad Moosipurgi kÃ¼lge
   Autopark.prototype = {

     init: function(){
       console.log('Rakendus lÃ¤ks tÃ¶Ã¶le');

       //kuulan aadressirea vahetust
       window.addEventListener('hashchange', this.routeChange.bind(this));

       // kui aadressireal ei ole hashi siis lisan juurde
       if(!window.location.hash){
         window.location.hash = 'home-view';
         // routechange siin ei ole vaja sest kÃ¤sitsi muutmine kÃ¤ivitab routechange event'i ikka
       }else{
         //esimesel kÃ¤ivitamisel vaatame urli Ã¼le ja uuendame menÃ¼Ã¼d
         this.routeChange();
       }

       //saan kÃ¤tte purgid localStorage kui on
       if(localStorage.cars){
           //vÃµtan stringi ja teen tagasi objektideks
           this.cars = JSON.parse(localStorage.cars);
           console.log('laadisin localStorageist massiiivi ' + this.cars.length);

           //tekitan loendi htmli
           this.cars.forEach(function(car){

               var new_car = new Car(car.mark, car.model, car.year);

               var li = new_car.createHtmlElement();
               document.querySelector('.list-of-cars').appendChild(li);

           });

       }


       // esimene loogika oleks see, et kuulame hiireklikki nupul
       this.bindEvents();

     },

     bindEvents: function(){
       document.querySelector('.add-new-car').addEventListener('click', this.addNewClick.bind(this));
       document.querySelector('.change-car').addEventListener('click', this.changeNewClick.bind(this));
       document.querySelector('.delete-car').addEventListener('click', this.deleteNewClick.bind(this));

       //kuulan trÃ¼kkimist otsikastis
       document.querySelector('#search').addEventListener('keyup', this.search.bind(this));

     },

     search: function(event){
         //otsikasti vÃ¤Ã¤rtus
         var needle = document.querySelector('#search').value.toLowerCase();
         console.log(needle);

         var list = document.querySelectorAll('ul.list-of-cars li');
         console.log(list);

         for(var i = 0; i < list.length; i++){

             var li = list[i];

             // Ã¼he listitemi sisu tekst
             var stack = li.querySelector('.content').innerHTML.toLowerCase();

             //kas otsisÃµna on sisus olemas
             if(stack.indexOf(needle) !== -1){
                 //olemas
                 li.style.display = 'list-item';

             }else{
                 //ei ole, index on -1, peidan
                 li.style.display = 'none';

             }

         }
     },

     addNewClick: function(event){
       //salvestame purgi
       //console.log(event);

       var mark = document.querySelector('.mark').value;
       var model = document.querySelector('.model').value;
       var year = document.querySelector('.year').value;

       //console.log(mark + ' ' + model);
       //1) tekitan uue Jar'i
       var new_car = new Car(mark, model, year);

       //lisan massiiivi purgi
       this.cars.push(new_car);
       console.log(JSON.stringify(this.cars));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('cars', JSON.stringify(this.cars));

       // 2) lisan selle htmli listi juurde
       var li = new_car.createHtmlElement();
       document.querySelector('.list-of-cars').appendChild(li);


     },
     changeNewClick: function(event){


       var mark = document.querySelector('.mark').value;
       var model = document.querySelector('.model').value;
       var year = document.querySelector('.year').value;


       var new_car = new Car(mark, model, year);

       //lisan massiiivi purgi
       this.cars.push(new_car);
       console.log(JSON.stringify(this.cars));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('cars', JSON.stringify(this.cars));

       // 2) lisan selle htmli listi juurde
       var li = new_car.createHtmlElement();
       document.querySelector('.list-of-cars').appendChild(li);


     },
     deleteNewClick: function(event){


       var mark = document.querySelector('.mark').value;
       var model = document.querySelector('.model').value;
       var year = document.querySelector('.year').value;

       //console.log(mark + ' ' + model);
       //1) tekitan uue Jar'i
       var delete_car = delete Car(mark, model, year);

       //lisan massiiivi purgi
       this.cars.push(delete_car);
       console.log(JSON.stringify(this.cars));
       // JSON'i stringina salvestan localStorage'isse
       localStorage.setItem('cars', JSON.stringify(this.cars));

       // 2) lisan selle htmli listi juurde
       var li = new_car.createHtmlElement();
       document.querySelector('.list-of-cars').appendChild(li);


     },

     routeChange: function(event){

       //kirjutan muuutujasse lehe nime, vÃµtan maha #
       this.currentRoute = location.hash.slice(1);
       console.log(this.currentRoute);

       //kas meil on selline leht olemas?
       if(this.routes[this.currentRoute]){

         //muudan menÃ¼Ã¼ lingi aktiivseks
         this.updateMenu();

         this.routes[this.currentRoute].render();


       }else{
         /// 404 - ei olnud
       }


     },

     updateMenu: function() {
       //http://stackoverflow.com/questions/195951/change-an-elements-class-with-javascript
       //1) vÃµtan maha aktiivse menÃ¼Ã¼lingi kui on
       document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

       //2) lisan uuele juurde
       //console.log(location.hash);
       document.querySelector('.'+this.currentRoute).className += ' active-menu';

     }

   }; // MOOSIPURGI LÃ•PP

   var Car = function(new_mark, new_model, new_year){
     this.mark = new_mark;
     this.model = new_model;
     this.year = new_year;
     console.log('created new Car');
   };

   Car.prototype = {
     createHtmlElement: function(){

       var li = document.createElement('li');

       var span = document.createElement('span');
       span.className = 'letter';

       var letter = document.createTextNode(this.mark.charAt(0));
       span.appendChild(letter);

       li.appendChild(span);

       var span_with_content = document.createElement('span');
       span_with_content.className = 'content';

       var content = document.createTextNode(this.mark + ' | ' + this.model + ' | ' + this.year);
       span_with_content.appendChild(content);

       li.appendChild(span_with_content);

       return li;

     }
   };

   // kui leht laetud kÃ¤ivitan Moosipurgi rakenduse
   window.onload = function(){
     var app = new Autopark();
   };

})();
