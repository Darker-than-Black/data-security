var key = document.getElementById('key');
var keyVal = '';

document.getElementById('addKey').onclick = function (e) {
	//console.log(key.value)
	keyVal = key.value;

	genMatrix();
}

var numLetKeys = [],
	matrix = "ABCDEFGHIKLMNOPQRSTVXYZ '";

function genMatrix() {
	
	for(var i = 0; i < keyVal.length; i++) {
		for(var j = 0; j < matrix.length; j++) {
			if( keyVal[i].toUpperCase() == matrix[j] ) {
				numLetKeys.push(j);
				//console.log( keyVal[i] + " " + matrix[j] )
			}
		}
	}
	//console.log(numLetKeys)
}

var textBiagrams = [];
document.getElementById('transformText').onclick = function (e) {
	var text = document.getElementById('text').value;
	
	for(var i = 0; i < text.length; i++) {
		for(var j = 0; j < matrix.length; j++) {
			if( text[i].toUpperCase() == matrix[j] ) {
				textBiagrams.push(j);
				//console.log( keyVal[i] + " " + matrix[j] )
			}
		}
	}
	//console.log(textBiagrams)

	encryption();
}


var encryptionText = [],
	cypher = [];
function encryption() {
	//console.log("textBiagrams " +textBiagrams.length)
	//console.log("numLetKeys "+numLetKeys.length)
	for(var i = 0, j = 0; i < numLetKeys.length, j < textBiagrams.length; i++, j++) {
		//console.log( i + ") " + textBiagrams[j] + " " + numLetKeys[i] )
		encryptionText.push( textBiagrams[j] + numLetKeys[i] );
		if( i == numLetKeys.length - 1)
			i = -1;
		if( j ==   textBiagrams.length - 1 )
			break;
	}
	console.log(encryptionText);

	// console.log( matrix.length )
	for(var i = 0; i < encryptionText.length; i++) {
		if( encryptionText[i] < matrix.length - 1) {
			cypher.push( encryptionText[i] )
		} else {
			cypher.push( returnMatrix( encryptionText[i] ) )
		}
	}

	console.log( cypher )


	var text = '';
	for(var i = 0; i < cypher.length; i++) {
	 	for(var j = 0; j < matrix.length; j++) {
	 		if( cypher[i] == j ) {
	 			text += matrix[j];
	 		}
	 	}
	 }

	document.getElementById('cypher').innerHTML = text;
}

function returnMatrix(num) {
	i = num - matrix.length;
	if( i < matrix.length - 1) {
		return i ;
	} else {
		return returnMatrix(i)
	}
}

var uncypher = [];
function uncypherLetter() {
	for(var i = 0, j = 0; i < numLetKeys.length, j < encryptionText.length; i++, j++) {
		//console.log( i + ") " + textBiagrams[j] + " " + numLetKeys[i] )
		uncypher.push( encryptionText[j] - numLetKeys[i] );
		if( i == numLetKeys.length - 1)
			i = -1;
		if( j ==   encryptionText.length - 1 )
			break;
	}

	var text = '';
	for(var i = 0; i < uncypher.length; i++) {
	 	for(var j = 0; j < matrix.length; j++) {
	 		if( uncypher[i] == j ) {
	 			text += matrix[j];
	 		}
	 	}
	 }

	console.log(uncypher)

	document.getElementById('uncypher').innerHTML = text;
}