// Game

		/**
		 * Randomization of array for pictures
		 * @param a array to randomize
		 * */
		function mix(a) {
			var j, x, i;
			for (i = a.length; i; i--) {
				j = Math.floor(Math.random() * i);
				x = a[i - 1];
				a[i - 1] = a[j];
				a[j] = x;
			}
		}

		//Checking similarity of two open pictures
		function checkSimilarity(n1, n2) {
			return n1 === n2;
		}

		function checkEmptiness(a){
			return a.length===0;
		}


		function createPictureDiv(i, j, p_number, img_type) {
			var container = document.createElement('div');

			var card = document.createElement('div');
			container.appendChild(card);
			var picture = document.createElement('div');
			card.appendChild(picture);

			container.className = 'f1_container'+ i + j;
			container.className += ' f1_container';
			card.className = 'f1_card'+ i + j;
			card.className += ' f1_card';
			picture.className = 'picture' + i + j;
			picture.className += ' pictureItem';
			picture.className += ' face';

			var left = (70 + 20) * j + 'px';
			var top = (70 + 20) * i + 'px';

			container.style.left = left;
			container.style.top = top;

			picture["data-row"] = i;
			picture["data-column"] = j;

			picture.className += " "+img_type+"_image_" + p_number;
			return container;
		}

		function createBlockDiv(i, j) {
					var iDiv = document.createElement('div');
					iDiv.className = 'block';
					iDiv.id = '' + i + j;
					iDiv.className += ' blockItem';
					iDiv.className += ' face';

					iDiv["data-row"] = i;
					iDiv["data-column"] = j;

					var left = (70 + 20) * j + 'px';
					var top = (70 + 20) * i + 'px';

					return iDiv;
		}


window.onload = function() {
		/*
		** Timer**
		*/
		var clicked = false;
		var sec = 0;
		var clock = '';



		function startClock() {
			if (clicked === false) {
				clock = setInterval(stopWatch, 1000);
				clicked = true;
			} else if (clicked === true) {
			}

		}

		function stopWatch() {
			sec++;
			document.getElementById("game_time").innerHTML = getMyMinutes(sec);
		}

		function getMyMinutes(n) {

			if (n > 59) {
				minutes = Math.floor(n/60);
				if (minutes< 10){
					minutes = "0" + minutes;
				} else if (n > 9) {
					minutes = "" + minutes;
				}
				seconds = getMySeconds(n % 60);

			} else {
				minutes = "00";
				seconds = getMySeconds(n);
			}
			return minutes +':'+ seconds;
		}

		function getMySeconds(n){
			if (n < 10){
				n = "0" + n;
			} else if (n > 9){
			 	n = "" + n;
			}
			return n;
		}

		function stopClock() {
			window.clearInterval(clock);
			sec = 0;
			//document.getElementById("game_time").innerHTML=0;
			clicked = false;
		}
		/*
		** end of Timer**
		*/


		// main function for resizing game field
		function level(col, img_type) {

			var row = 4;
			var field = document.querySelector('#field');
			//field.style.visibility = 'visible';
			field.style.opacity= 1;
			field.style.width = (70 + 20) * col - 20 + 'px';

			while (field.firstChild) {
				field.removeChild(field.firstChild);
			}

			//creation of array of numbers (pictures)
			p_num = row * col / 2;
			var pictures = [];
			var pictures2 = [];

			for (k = 0; k < p_num; k++) {
				pictures.push(k + 1, k + 1);
			}

			mix(pictures);

			// add invisible divs for pictures
			for (i = 0; i < row; i++)
				for (j = 0; j < col; j++) {
					var currentEl= pictures.pop();
					field.appendChild(createPictureDiv(i, j, currentEl, img_type));
					pictures2[j + i * p_num]=  currentEl;
				}

			for (i = 0; i < row; i++)
				for (j = 0; j < col; j++) {

					var myDiv=createBlockDiv(i, j);// add visible divs for items/blocks
					var currentCardSelector = '.f1_card' + i + j;
					document.querySelector(currentCardSelector).appendChild(myDiv);


					//when we click on item
					var counter = 0;
					var deletedItems=0;
					var openPicture = '';
					var closedBlock = '';

					myDiv.onclick = function() {

						if (counter == 2) {
							return;
						}
						counter++; //it shows how  much pictures is opened
						ID = this.id;
						var activeBlock = this;
						var selector = '.picture' + ID;
						var selectorCard2 = '.f1_card' + ID;
						var activePicture = document.querySelector(selector);

						document.querySelector(selectorCard2).style.transform = 'rotateY(180deg)';


						if (counter == 1) {
							closedBlock = activeBlock; //memorising selectors for first opened picture and item
							openPicture = selector;
							selectorCard1= selectorCard2;
						}

						if (counter == 2) {
							setTimeout(
								function() {
									var firstOpenPicture = document.querySelector(openPicture);

									var index1 = activePicture["data-column"] + p_num * activePicture["data-row"];
									var index2 = firstOpenPicture["data-column"] + p_num * firstOpenPicture["data-row"];
									var activePictureNumber = pictures2[index1];
									var firstOpenPictureNumber = pictures2[index2];

									var similar = checkSimilarity(activePictureNumber, firstOpenPictureNumber);

									if (similar) {
										activeBlock.style.display = 'none';
										closedBlock.style.display = 'none';
										activePicture.style.display = 'none';
										firstOpenPicture.style.display = 'none';

										//delete pictures2[index1];
										//delete pictures2[index2];
										deletedItems++;

											if (deletedItems==p_num) {
												text = document.createElement('p');
												field.appendChild(text);
												text.innerHTML = "Congratulations! You are so fast!";
												text.className += 'smile_img';
												stopClock();
											}

									} else {

										document.querySelector(selectorCard1).style.transform = 'rotateY(0deg)';
										document.querySelector(selectorCard2).style.transform = 'rotateY(0deg)';

									}
									counter = 0;

								},
								1000);

						}

					}

				} //--add visible items
		}


		var level1 = document.querySelector("#level_1");
		var level2 = document.querySelector("#level_2");
		var level3 = document.querySelector("#level_3");


		function removeClasses(){
			level1.className = '';
			level2.className = '';
			level3.className = '';
		}
		
		var img_type='numbers';
		
		function init(){
			removeClasses();
			stopClock();
			startClock();
			document.querySelector("#reset").style.display = 'block';
		}

		function reset(){
			stopClock();
			//document.querySelector('#field').style.visibility= 'hidden';
			document.querySelector('#field').style.opacity= 0;
			document.getElementById("game_time").innerHTML= '00:00';
			removeClasses();
			document.querySelector("#reset").style.display= 'none';
		}

		numbers.onclick = function() {
			this.className += ' active_level';
			img_type='numbers';
			cars.className = '';
			ferma.className = '';
			reset();
		}

		cars.onclick = function() {
			this.className += ' active_level';
			img_type='cars';
			numbers.className = '';
			ferma.className = '';
			reset();
		}

		ferma.onclick = function() {
			this.className += ' active_level';
			img_type='ferma';
			cars.className = '';
			numbers.className = '';
			reset();
		}

		level1.onclick = function() {
			init();
			this.className += ' active_level';
			level(3, img_type);
		}


		level2.onclick = function() {
			init();
			this.className += ' active_level';
			level(4, img_type);
		}


		level3.onclick = function() {
			init();
			this.className += ' active_level';
			level(5, img_type);
		}

		document.querySelector("#reset").onclick = function() {
			reset();
		}

}
