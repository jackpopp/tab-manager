/* Created the packed zip for uploading */
var zip = new require('node-zip')();
var fs = require('fs');

var files = [
	'./manifest.json',
	'./lib/app.js',
  './lib/init.js',
	'./lib/index.html',
	'./lib/init.js',
	'./lib/popup.html',
	'./lib/style.css',
	'icon_128.png',
	'icon_16.png',
];

files.forEach((file) => {
  var buffer = fs.readFileSync(file, 'binary');
	var fileArray = file.split('/');
  zip.file(fileArray[fileArray.length - 1], buffer);
});

var data = zip.generate({ base64:false, compression:'DEFLATE' });
fs.writeFileSync('dist.zip', data, 'binary');
