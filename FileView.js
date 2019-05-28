var fs = require('fs');
var join = require('path').join;

var arguments = process.argv.splice(2);

console.log('所传递的参数是：', arguments);

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});


var _path = "c:/node";
if( arguments && arguments.length>0){
	_path = arguments[0];
}



function getJsonFiles(jsonPath){
    let jsonFiles = [];
    function findJsonFile(path){
        let files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            let fPath = join(path,item);
            let stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                findJsonFile(fPath);
            }
            if (stat.isFile() === true) { 
              jsonFiles.push(fPath);
            }
        });
    }
    findJsonFile(jsonPath);
    console.log(jsonFiles);
}
 
 

getJsonFiles(_path);