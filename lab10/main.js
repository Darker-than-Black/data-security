var keyW = document.getElementById('w');
var keyVal;

document.getElementById('addKey').onclick = function (e) {
	//console.log(key.value)
	keyVal = parseInt(keyW.value, 10);
	console.log(keyVal);
}


var textBiagrams = [];
document.getElementById('transformText').onclick = function (e) {
	var text = document.getElementById('text').value;
	console.log(text)
	console.log(text.length)

	var rows = Math.ceil(text.length / keyVal);

	console.log(rows)

	for(var i = 0; i < rows; i++) {
		textBiagrams[i] = [];
		for(var j = 0; j < keyVal; j++) {
			textBiagrams[i][j] = text[ i*keyVal+j ];
			// if( !(text[ i*keyVal+j ] == ' ') ) {
			// 	//console.log(text[ i*keyVal+j ])
			// 	textBiagrams[i][j] = text[ i*keyVal+j ];
			// } else {
			// 	textBiagrams[i][j] = undefined
			// }
		}
	}

	var table = '<table>';
	for(var i = 0; i < rows; i++) {
		table += '<tr>';
		for(var j = 0; j < keyVal; j++) {
			if( !(textBiagrams[i][j] == undefined) )
				table += '<td>' + textBiagrams[i][j] + '</td>'
		}
		table += '</tr>'
	}

	table += '</table>';

	document.getElementById('matrix').innerHTML = table;
	
	console.log(textBiagrams);

	encryption();
}




var encryptionText = [],
	text = '';
function encryption() {
	encryptionText = transpose(textBiagrams)

	console.log(encryptionText);

	for(var i = 0; i < encryptionText.length; i++) {
		if( i > 0)
				text += '_'
		for(var j = 0; j < encryptionText[i].length; j++) {
			if( !(encryptionText[i][j] == undefined) )
	 			text += encryptionText[i][j];
		}
	 }
	document.getElementById('cypher').innerHTML = text;
}

function transpose(a) {
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;
  if(h === 0 || w === 0) { return []; }
  var i, j, t = [];
  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }

  return t;
}


var uncypher = [],
	uncypherText = [];
function uncypherLetter() {
	uncypherText = text.split('_');
	for(var i = 0; i < uncypherText.length; i++) {
		uncypher[i] = []
		for(var j = 0; j < uncypherText[i].length; j++) {
			uncypher[i][j] = uncypherText[i][j]
		}
	}

	uncypher = transpose(uncypher);

	var unText = '';
	for(var i = 0; i < uncypher.length; i++) {
		for(var j = 0; j < uncypher[i].length; j++) {
			if( !(encryptionText[i][j] == undefined) )
				unText += uncypher[i][j];
		}
	}

	console.log(uncypherText)
	console.log(uncypher)

	document.getElementById('uncypher').innerHTML = unText;
}