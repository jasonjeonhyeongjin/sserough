import express from 'express';
import * as bodyParser from 'body-parser';
import { interval, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import sseWrapper from 'express-sse-middleware'; // tslint:disable-line

const app = express();

interface MessageEvent {
  text: string;
}

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(sseWrapper);


const source$ = new Subject<MessageEvent>();

source$.subscribe(console.log);

app.get('/demo', (req: any, res: any) => {
  const sse = res.sse();
  console.log('get1 sse :'+sse);
  const conn$ = interval(1000)
    .pipe(map(String))
    .subscribe(
      //sse.send.bind(sse)
      (ev: any ) => {
        console.log('get1 enew Date():'+new Date());
        sse.send(new Date().toLocaleString());
      } 
    );
  console.log('get1 sse :'+sse);
  req.on('close', () => {
    conn$.unsubscribe();
  });
});

app.get('/sse', (req: any, res:any) => {
  const sse = res.sse();
  console.log('get2 sse :'+sse);
  const sub$ = source$
    .pipe(filter((ev: any)  => true))
    .subscribe(
      (ev: any ) => {
      console.log('get2 ev.text:'+ev.text);
      sse.send(ev.text);
    });

  // connection keep alive
  const conn$ = interval(10000)
    .subscribe(sse.keepAlive.bind(sse));

  req.on('close', () => {
    sub$.unsubscribe();
    conn$.unsubscribe();
  });
});

app.post('/message', (req: any, res: any) => {
  const param: MessageEvent = req.body;
  console.log('post req.body:'+req.body);
  source$.next(param);
  res.write('test1');
  res.json({ success: true }).end();
});

app.use('/', express.static('./static'));


app.listen(process.env.PORT || 3000, () => {
  console.log('started!');
});