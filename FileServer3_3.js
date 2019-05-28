var http = require('http');
var fs = require('fs');//引入文件读取模块

console.log('all para:'+process.argv+"\n");
var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);

//////////////////////////
// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

var port8888='8888';
var documentRoot = 'C:/nginx/html/';
//需要访问的文件的存放目录


if(arguments && arguments.length>0){
	documentRoot=arguments[0];
}

var server= http.createServer(function(req,res){

    var url = req.url; 
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html 

    var file = documentRoot + url;
    console.log(url);
    //E:/PhpProject/html5/websocket/www/index.html 


    fs.readFile( file , function(err,data){
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
        if (err) {
            res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.write('<h4>' + err + '</h4>');
            res.end();
			console.log(err);
        } else {
            var end = url.substr(url.lastIndexOf('.')).toLowerCase();
            switch (end) {
                case '.js':
                    res.writeHeader(200, {
                        'content-type': 'text/javascript;charset="utf-8"'
                    });
                    break;
                case ".htm":
                    res.writeHeader(200, {
                        'content-type': 'text/html;charset="utf-8"'
                    });
                    break;
                case ".html":
                    res.writeHeader(200, {
                        'content-type': 'text/html;charset="utf-8"'
                    });
                    break;
                case ".json":
                    res.writeHeader(200, {
                        'content-type': 'application/json;charset="utf-8"'
                    });
                    break;
                case ".css":
                    res.writeHeader(200, {
                        'content-type': 'text/css;charset="utf-8"'
                    });
                    break;   
				case ".xml":
                    res.writeHeader(200, {
                        'content-type': 'text/xml;charset="utf-8"'
                    });
                    break;
				case ".jpg":
                    res.writeHeader(200, {
                        'content-type': 'image/jpeg;charset="utf-8"'
                    });
                    break;
				case ".jpeg":
                    res.writeHeader(200, {
                        'content-type': 'image/jpeg;charset="utf-8"'
                    });
                    break;
                case ".png":
                    res.writeHeader(200, {
                        'content-type': 'image/png;charset="utf-8"'
                    });
                    break;
                case ".gif":
                    res.writeHeader(200, {
                        'content-type': 'image/gif;charset="utf-8"'
                    });
                case ".png":
                    res.writeHeader(200, {
                        'content-type': 'image/png;charset="utf-8"'
                    });
                    break;
                default:
                    res.writeHeader(200, {
                        'content-type': 'text/html;charset="utf-8"'
                    });
                    break;
            }

            res.write(data);//将index.html显示在客户端
            res.end();
        }
    });
}).listen(port8888);

console.log('服务器开启成功');