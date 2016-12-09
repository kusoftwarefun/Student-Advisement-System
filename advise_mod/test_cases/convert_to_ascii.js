// Convert raw pdf data to ascii
////// EXTRACT TEXT FROM raw PDF data
var fs = require('fs');
var extract = require('pdf-text-extract');
var path = require('path');
var filePath = path.join(__dirname, '../unofficial.pdf');

extract(filePath, { splitPages: false}, function (err, text)
{
    if (err) 
    {
        console.dir(err);
        return;
    }
    console.dir(text);
    fs.writeFile("../unofficial_test.txt", text);
});

