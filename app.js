(function(){
  "use strict";

  var PassGen = function(){
    // SINGLETON PATTERN (4 rida)
    if(PassGen.instance){
      return PassGen.instance;
    }
    PassGen.instance = this;

	this.passwords = []; //massiiv paroolide jaoks
	this.password_length = null;

	//ul kuhu pistame paroole
	this.container = document.querySelector('#container');


    //panen rakenduse tĆ¶Ć¶le
    this.init();
  };

  //teeme muutuja avalikuks
  window.PassGen = PassGen;

  //kĆµik  funktsioonid tulevad siia sisse
  PassGen.prototype = {
    init: function(){
      console.log('rakendus kĆ¤ivitus');

	  //kuulan nupuvajutust
	  document.querySelector('#generate').addEventListener('click', this.generatePasswords.bind(this));

    },
	generatePasswords: function(){

		//teeme massiivi tĆ¼hjaks
		this.passwords = [];

		//8 vĆµi 16
		this.password_length = document.querySelector('#pass-length').value;

		console.log('genereerin ' + this.password_length);

		//paroolide arv
		var count = 10;

		for(var i = 0; i < count; i++){

			//random index
			var random_index = Math.round(Math.random() * words[this.password_length].length);

			//console.log(random_index);
			var password = words[this.password_length][random_index];
			this.passwords.push(crypt(password));

		}

		this.printPasswords();

	},
	printPasswords: function(){

		this.container.innerHTML = '';

		for(var i = 0; i < this.passwords.length; i++){

			//tekitan li kus sees on parool
			var el = document.createElement('li');
			var text = document.createTextNode(this.passwords[i]);
			el.appendChild(text);
			this.container.appendChild(el);


		}


	}


  };
  //Helper Function
  var crypt = function(word){

    var length = word.length;

    word = word.replace('i','1');
    word = word.replace('o','0');
    word = word.replace('s','5');

    if(length === 6){

      word += Math.round(Math.random()*10);
      word += Math.round(Math.random()*10);
    }else if(length === 12){

      word += Math.round(Math.random()*10);
      word += Math.round(Math.random()*10);
      word += Math.round(Math.random()*10);
      word += Math.round(Math.random()*10);
    }

    return word;

  };

  window.crypt = crypt;

  window.onload = function(){
    var app = new PassGen();
  };

})();
