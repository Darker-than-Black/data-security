var keyW = document.getElementById('w');
var keyVal;

var textBiagrams = [];
var promText = [];

var ux = [
	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ],
	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
];

var prom;

document.getElementById('transformText').onclick = function (e) {
	var text = document.getElementById('text').value;
	console.log( text )
	console.log( text.length )

	textBiagrams = text.split(' ');

	var numLet = 0;
	for(var i = 0; i < textBiagrams.length; i++) {
		for(var j = 0; j < textBiagrams[i].length; j++) {
			numLet++;
		}
	}

	var text2 = '';
	for(var i = 0; i < text.length; i++) {
		if( text[i] == ' ' ) {
			continue;
		} else {
			text2 += text[i]
		}
	}

	console.log( text2 )

	prom = Math.ceil(numLet / 4);


	var n = 0;
	// promText[n] = [];
	for(var i = 0; i < text2.length; i++) {
		if(!(i % prom)) {
			n++;
			promText[n] = [];
		}
		if( text2[i] == ' ' ) {
			continue;
		}
		promText[n].push( text2[i] )
	}

	// console.log( numLet )
	promText.shift();
	// console.log( promText )

	document.getElementById('recom').innerHTML = 'Рекомендована довжина ключа: ' +  prom;
}

var uxc = [];

document.getElementById('addKey').onclick = function (e) {
	//console.log(key.value)
	keyVal = keyW.value.split(',');
	for(var key in keyVal) {
		keyVal[key] = parseInt(keyVal[key], 10)
	}

	for(var a = 0; a < 4; a++) {
		for(var i = 0; i < keyVal.length; i++) {
			ux[a][ keyVal[i] - 1 ] = promText[a][i]
		}
	}

	console.log(ux);
	
	var n = 0;
	for(var a = 0; a < ux.length; a++) {
		uxc[a] = transformStringToArray(ux[a], a)
	}
	console.log(uxc)

	uxc[1] = rotateClockwise( uxc[1] )
	uxc[2] = rotateClockwise(rotateClockwise( uxc[2] ))
	uxc[3] = rotateClockwise(rotateClockwise(rotateClockwise( uxc[3] )))

	console.log(uxc)

	for(var a = 0; a < uxc.length; a++) {
		var table = '<table class="g'+ a +'">';
		for(var i = 0; i < uxc[a].length; i++) {
			table += '<tr>'
			for(var j = 0; j < uxc[a][i].length; j++) {
				if(isNaN(uxc[a][i][j])) {
					table += '<td>' + uxc[a][i][j] + '</td>'
				} else {
					table += '<td>-</td>'
				}
			}
			table += '</tr>'
		}
		table += '</table>';
		document.getElementById('matrix').innerHTML += table;
	}
}

function transformStringToArray(str, i) {
	// console.log(str)
	// console.log(i)
	var arr = []
	var n = 0;
	for(var i = 0; i < str.length; i++) {
		if(!(i % 4)) {
			n++;
			arr[n] = [];
		}

		arr[n].push( str[i] )
	}
	arr.shift();
	return arr.slice(0);
}

function rotateClockwise(a) {
    var n=a.length;
    for (var i=0; i<n/2; i++) {
        for (var j=i; j<n-i-1; j++) {
            var tmp=a[i][j];
            a[i][j]=a[n-j-1][i];
            a[n-j-1][i]=a[n-i-1][n-j-1];
            a[n-i-1][n-j-1]=a[j][n-i-1];
            a[j][n-i-1]=tmp;
        }
    }
    return a;
}

var encryptionText = [],
	enText = [],
	text = '';
function uncypherLetter () {

 // 	for(var a = 0; a < ux.length; a++) {
	// 	for(var i = 0; i < keyVal.length; i++) {
	// 		text += ux[a][ keyVal[i] - 1 ] ;
	// 	}
	// }

	encryptionText = uxc.slice(0);
	encryptionText[1] = rotateClockwise(rotateClockwise(rotateClockwise( encryptionText[1] )))
	encryptionText[2] = rotateClockwise(rotateClockwise( encryptionText[2] ))
	encryptionText[3] = rotateClockwise( encryptionText[3] );

	console.log(encryptionText)

	for(var a = 0; a < encryptionText.length; a++) {
		enText[a] = [];
		for(var i = 0; i < encryptionText[a].length; i++) {
			for(var j = 0; j < encryptionText[a][i].length; j++) {
				enText[a].push( encryptionText[a][i][j] )
			}
		}
	}

	console.log(enText)

	
 	for(var a = 0; a < enText.length; a++) {
		for(var i = 0; i < keyVal.length; i++) {
			text += enText[a][ keyVal[i] - 1 ] ;
		}
	}

	document.getElementById('uncypher').innerHTML = text;
}