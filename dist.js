/* Created the packed zip for uploading */
var fs = require('fs');
var archiver = require('archiver');
var files = [
	'lib/app.js',
	'lib/index.html',
	'lib/init.js',
	'lib/popup.html',
	'lib/style.css',
	'icon_128.png',
	'icon_16.png',
	'manifest.json',
];
var output = fs.createWriteStream('dist.zip');
var archive = archiver('zip');

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
});

archive.on('error', function(err) {
    throw err;
});

archive.pipe(output);
files.forEach((file) => {
	archive.append(fs.createReadStream(file), { name: 'folder/' + file });
});
archive.finalize();
