import express from 'express';
import sseMiddleware from 'express-sse-middleware';
import * as http from "http";
import * as path from "path";
import * as fs   from "fs";
import { start } from "repl";



class Main {
  constructor() {
    // httpサーバーを設定する
    const server: http.Server = http.createServer(
        (request: http.IncomingMessage, response: http.ServerResponse) =>
            this.requestHandler(request, response));
    // サーバーを起動してリクエストを待ち受け状態にする
    server.listen(3000, () => console.log('Listening on http://localhost:3000/'));
  }

  /*
  * サーバーにリクエストがあった時に実行される関数
  */
  private requestHandler(request: http.IncomingMessage,
                         response: http.ServerResponse): void {
                            response.writeHead(200, { 'Content-Type': 'text/html',
                            'Cache-Control': 'no-cache','Access-Control-Allow-Origin': '*'});
                            
                            var dateTime = new Date();
                            console.log('dateTime'  + dateTime);
                            var reqpath = request.url;
                            var dir = path.join(__dirname, '');
                            //response.write('Current time1: ' + dateTime);
                            //response.write('Current time2: ' + dateTime);
                            response.write('<!doctype html>\n<html lang="en">\n' + 
    '\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' + 
    '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
    '\n\n<h1>Euro 2012 teams</h1>\n' + 
    '<div id="content"><p>The teams in Group D for Euro 2012 are:</p><ul><li>England</li><li>France</li><li>Sweden</li><li>Ukraine</li></ul></div>' + 
    '<div id="result"></div>' + 
    '\n\n');
    response.write('<script>');
    response.write(' if(typeof(EventSource) !== "undefined") {'+
    '  var source = new EventSource("https://www.w3schools.com/html/demo_sse.php");'+
    '   source.onmessage = function(event) { '+
    '    console.debug(event.data );'+
      '    document.getElementById("result").innerHTML += event.data + "<br>" ;'+
      '            };'+
      '           } else {'+
      '    console.debug("no event" );'+
        '              document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";'+
        '                }');
                            response.write('</script>');
                            // console.log('reqpath : '+ reqpath);
                            // if(reqpath){
                            //   console.log('reqpath in if : '+ reqpath);

                            //     var file = path.join(dir, reqpath.replace(/\/$/, '../index.html'));
                            //     console.log('file in if : '+ file);
                            //     var type = 'text/event-stream';
                            //     var s = fs.createReadStream(file);
                            //     s.pipe(response);
                            // }
                            // console.log('after'+ response.getHeaders());
                        
                            response.end();
                        }
}

const main = new Main();