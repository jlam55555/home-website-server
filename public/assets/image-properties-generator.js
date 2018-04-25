var fs = require('fs');

// read all files from assets/person directory
fs.readdir('./people', (err, files) => {
  if(err) return console.log(err);

  var fileArray = [];
  files.forEach(file => {

    /**
      * filename convention: name-name-name-image_tag-01-23-45-min.JPG
      */
    // remove -min if exists
    var filename = file;
    file = file.replace(/\-min\./, '.');

    var extensionParts = file.split('\.');
    var fileParts = extensionParts[0].split('\-');

    var date = fileParts.splice(-3).join('-');
    var tag = fileParts.splice(-1)[0].split('_').join(' ');
    var people = fileParts;

    var fileProps = {
      path: '/assets/people/' + filename,
      date: date,
      tag: tag,
      people: people
    };

    fileArray.push(fileProps);
  });

  fs.writeFile('../app/image-properties.ts', `export default ${JSON.stringify(fileArray, null, 2)};`, e=>e&&console.log(e));
});
