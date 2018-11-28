var key = document.getElementById('key');
var keyVal = '';

document.getElementById('addKey').onclick = function (e) {
	console.log(key.value)
	keyVal = key.value;
}

var stringKeys = [],
	matrix = [];

function genMatrix() {
	// clear stringKeys
	for (var key in stringKeys) 
		delete stringKeys[key];
	for(var i = 0; i < keyVal.length; i++) {
		stringKeys[i] = keyVal[i];
	}
	stringKeys = unique(stringKeys);
	addElementBystringKeys();

	for(;;) {
		stringKeys = unique(stringKeys);
		if( stringKeys.length < 25 ) {
			addElementBystringKeys();
		} else {
			break;
		}
	}

	for(var i = 0; i < 5; i++) {
		matrix[i] = [];
		for(var j = 0; j < 5; j++) {
			matrix[i][j] = stringKeys[ i*5+j ];
		}
	}

	var tableMatrix = '<table>';
	for(var i = 0; i < matrix.length; i++) {
		tableMatrix += '<tr>'
		for(var j = 0; j < matrix[i].length; j++) {
			//console.log( matrix[i][j])
			tableMatrix += '<td>'+  matrix[i][j] +'</td>'
		}
		tableMatrix += '</tr>'
	}
	tableMatrix += '</table>';

	document.getElementById('matrixShow').innerHTML = tableMatrix;

	//console.log(stringKeys);
	//console.log(matrix);
}

function addElementBystringKeys() {
	for(;;) {
		if(stringKeys.length < 25) {
			stringKeys[stringKeys.length] = randomLetter();
		} else {
			return stringKeys;
		}
	}
}

function unique(arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true; // запомнить строку в виде свойства объекта
  }
  return Object.keys(obj); // или собрать ключи перебором для IE8-
}

// пропускаємо букву Q
function randomLetter() {
  var possible = "abcdefghijklmnoprstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}

////////////////////////////
// розбити на біграми
var textBiagrams = [];
document.getElementById('transformText').onclick = function (e) {
	var text = document.getElementById('text').value;
	if(text.length & 1) {
		text += 'Q';
	}
	textBiagrams = [];
	var textHTML = '';
	for(var i = 0; i < text.length; i +=2) {
		if(text[i] == text[i+1]) {
			textBiagrams.push(text[i]+"%");
			//textHTML += text[i]+"%" + ' / ';
		} else {
			textBiagrams.push(text[i]+text[i+1]);
		}
		textHTML += text[i]+text[i+1] + ' / ';
	}
	//console.log(textBiagrams);
	//console.log(textHTML);


	document.getElementById('biagrams').innerHTML = textHTML;
	//console.log(textBiagrams);
	encryption(textBiagrams);
}


var encryptionText = [];
var coordnate = {
	x1: null,
	y1: null,
	x2: null,
	y2: null 
};
function encryption(array) {

	for(var i = 0; i < array.length; i++) {
		//console.log(array[i][0])
		for(var key in coordnate) {
			coordnate[key] = null;
		}
		for(var j = 0; j < matrix.length; j++) {
			for(var k = 0; k < matrix[j].length; k++) {
				if(array[i][0] == matrix[j][k]) {
					coordnate.x1 = j;
					coordnate.y1 = k;
				}
				if(array[i][1] == matrix[j][k]) {
					coordnate.x2 = j;
					coordnate.y2 = k;
				}
			}
		}

		if ( coordnate.y1 == coordnate.y2 ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $x1 = coordnate.x1 - 1;
			let $x2 = coordnate.x2 - 1;
			if( (coordnate.x1 - 1) < 0 )
				$x1 = 4;
			if( (coordnate.y2 - 1) < 0 )
				$x2 = 4;
			encryptionText.push(
				matrix[$x1][coordnate.y1] + matrix[$x2][coordnate.y2]
			)
		} else if( (( coordnate.x1 - coordnate.x2 ) ==  1) && (coordnate.y1 == coordnate.y2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $x1 = coordnate.x1 + 1;
			if( (coordnate.x1 + 1) > 4 ) 
				$x1 = 0;

			encryptionText.push(
				matrix[coordnate.x1][coordnate.y1] + matrix[$x1][coordnate.y1]
			)
		} else if( (( coordnate.x1 - coordnate.x2 ) == -1) && (coordnate.y1 == coordnate.y2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $x1 = coordnate.x1 + 1;
			let $x2 = coordnate.x2 + 1;
			if( (coordnate.x1 + 1) > 4 )
				$x1 = 0;
			if( (coordnate.x2 + 1) > 4 )
				$x2 = 0;

			encryptionText.push(
				matrix[$x1][coordnate.y1] + matrix[$x2][coordnate.y2]
			)
		} else if ( coordnate.x1 == coordnate.x2 ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $y1 = coordnate.y1 + 1;
			let $y2 = coordnate.y2 + 1;
			if( (coordnate.y1 + 1) > 4 )
				$y1 = 0;
			if( (coordnate.y2 + 1) > 4 )
				$y2 = 0;
			encryptionText.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if( (( coordnate.y1 - coordnate.y2 ) ==  1) && (coordnate.x1 == coordnate.x2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $y1 = coordnate.y1 - 1;
			let $y2 = coordnate.y2 - 1;
			if( (coordnate.y1 - 1) < 0 )
				$y1 = 4;
			if( (coordnate.x2 - 1) < 0 )
				$y2 = 4;
			encryptionText.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if( (( coordnate.y1 - coordnate.y2 ) == -1) && (coordnate.x1 == coordnate.x2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			let $y1 = coordnate.y1 + 1;
			let $y2 = coordnate.y2 + 1;
			if( (coordnate.y1 + 1) > 4 )
				$y1 = 0;
			if( (coordnate.x2 + 1) > 4 )
				$y2 = 0;
			encryptionText.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if(coordnate.x2 == null) {
			console.log(coordnate.x1 + ' ' + coordnate.y1)
			console.log(matrix[coordnate.x1][coordnate.y1] )
			console.log(' ');
			let $x1 = coordnate.x1 - 1;
			let $y1 = coordnate.y1 + 1;
			if( (coordnate.x1 - 1) < 0 )
				$x1 = 4;
			if( (coordnate.y1 + 1) > 4 )
					$y1 = 0;
			encryptionText.push(
				matrix[$x1][$y1] + 'Q'
			)
		} else if( (coordnate.x1 != coordnate.x2) && (coordnate.y1 != coordnate.y2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			console.log(' ');
			encryptionText.push(
				matrix[coordnate.x1][coordnate.y2] + matrix[coordnate.x2][coordnate.y1]
			)
		} 
	}

	var cypher = '';
	for(var i = 0; i < encryptionText.length; i++) {
		cypher += encryptionText[i] + ' / ';
	}

	var cypher2 = '';
	for(var i = 0; i < encryptionText.length; i++) {
		cypher2 += encryptionText[i];
	}

	document.getElementById('cypher').innerHTML = cypher;
	document.getElementById('cypher2').innerHTML = cypher2;

	//console.log(coordnate);
	console.log(encryptionText);
}

var uncypher = [];
function uncypherLetter() {
	for(var i = 0; i < encryptionText.length; i++) {
		//console.log(array[i][0])
		for(var key in coordnate) {
			coordnate[key] = null;
		}
		for(var j = 0; j < matrix.length; j++) {
			for(var k = 0; k < matrix[j].length; k++) {
				if(encryptionText[i][0] == matrix[j][k]) {
					coordnate.x1 = j;
					coordnate.y1 = k;
				}
				if(encryptionText[i][1] == matrix[j][k]) {
					coordnate.x2 = j;
					coordnate.y2 = k;
				}
			}
		}

		if ( coordnate.y1 == coordnate.y2 ) {
			let $x1 = coordnate.x1 + 1;
			let $x2 = coordnate.x2 + 1;
			if( (coordnate.x1 + 1) > 4 )
				$x1 = 0;
			if( (coordnate.y2 + 1) > 4 )
				$x2 = 0;
			uncypher.push(
				matrix[$x1][coordnate.y1] + matrix[$x2][coordnate.y2]
			)
		} else if( (( coordnate.x1 - coordnate.x2 ) ==  1) && (coordnate.y1 == coordnate.y2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			let $x1 = coordnate.x1 - 1;
			if( (coordnate.x1 - 1) < 0 ) 
				$x1 = 4;

			uncypher.push(
				matrix[coordnate.x1][coordnate.y1] + matrix[$x1][coordnate.y1]
			)
		} else if( (( coordnate.x1 - coordnate.x2 ) == -1) && (coordnate.y1 == coordnate.y2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			let $x1 = coordnate.x1 - 1;
			let $x2 = coordnate.x2 - 1;
			if( (coordnate.x1 - 1) < 0 )
				$x1 = 4;
			if( (coordnate.x2 - 1) < 0 )
				$x2 = 4;

			uncypher.push(
				matrix[$x1][coordnate.y1] + matrix[$x2][coordnate.y2]
			)
		} else if ( coordnate.x1 == coordnate.x2 ) {
			let $y1 = coordnate.y1 - 1;
			let $y2 = coordnate.y2 - 1;
			if( (coordnate.y1 - 1) < 0 )
				$y1 = 4;
			if( (coordnate.y2 - 1) < 0 )
				$y2 = 4;
			uncypher.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if( (( coordnate.y1 - coordnate.y2 ) ==  1) && (coordnate.x1 == coordnate.x2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			let $y1 = coordnate.y1 + 1;
			let $y2 = coordnate.y2 + 1;
			if( (coordnate.y1 + 1) > 4 )
				$y1 = 0;
			if( (coordnate.x2 + 1) > 4 )
				$y2 = 0;
			uncypher.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if( (( coordnate.y1 - coordnate.y2 ) == -1) && (coordnate.x1 == coordnate.x2) ) {
			console.log('X: '+ coordnate.x1 +' '+ coordnate.x2 );
			console.log('Y: '+ coordnate.y1 +' '+ coordnate.y2 );
			let $y1 = coordnate.y1 - 1;
			let $y2 = coordnate.y2 - 1;
			if( (coordnate.y1 - 1) < 0 )
				$y1 = 4;
			if( (coordnate.x2 - 1) < 0 )
				$y2 = 4;
			uncypher.push(
				matrix[coordnate.x1][$y1] + matrix[coordnate.x2][$y2]
			)
		} else if(coordnate.x2 == null) {
			console.log(coordnate.x1 + ' ' + coordnate.y1)
			console.log(matrix[coordnate.x1][coordnate.y1] )
			let $x1 = coordnate.x1 + 1;
			let $y1 = coordnate.y1 - 1;
			if( (coordnate.x1 + 1) > 4 )
				$x1 = 0;
			if( (coordnate.y1 - 1) < 0 )
					$y1 = 4;
			uncypher.push(
				matrix[$x1][$y1] + 'Q'
			)
		} else if( (coordnate.x1 != coordnate.x2) && (coordnate.y1 != coordnate.y2) ) {
			uncypher.push(
				matrix[coordnate.x1][coordnate.y2] + matrix[coordnate.x2][coordnate.y1]
			)
		} 
	}

	console.log(uncypher)

	var uncypherText = '';
	for(var i = 0; i < uncypher.length; i++) {
		if(uncypher[i] == uncypher[uncypher.length - 1]) {
			console.log( uncypher[i][1] == "Q" )
			if( uncypher[i][1] == "Q" ) {
				uncypherText += uncypher[i][0];	
			} else {
				uncypherText += uncypher[i];	
			}
		} else {
			uncypherText += uncypher[i]  + ' / ';;	
		}
	}

	var uncypherText2 = '';
	for(var i = 0; i < uncypher.length; i++) {
		if(uncypher[i] == uncypher[uncypher.length - 1]) {
			console.log( uncypher[i][1] == "Q" )
			if( uncypher[i][1] == "Q" ) {
				uncypherText2 += uncypher[i][0];	
			} else {
				uncypherText2 += uncypher[i];	
			}
		} else {
			uncypherText2 += uncypher[i];	
		}
	}

	document.getElementById('uncypher').innerHTML = uncypherText;
	document.getElementById('uncypher2').innerHTML = uncypherText2;
}


// let $x1 = coordnate.x1 - 1;
		// let $x2 = coordnate.x2 + 1;
		// let $y1 = coordnate.y1 + 1;
		// let $y2 = coordnate.y2 - 1;
		// if( (coordnate.x1 - 1) < 0 )
		// 	$x1 = 4;
		// if( (coordnate.x2 + 1) > 4 )
		// 	$x2 = 0;
		// if( (coordnate.y1 + 1) > 4 )
		// 	$y1 = 0;
		// if( (coordnate.y2 - 1) < 0 )
		// 	$y2 = 4;