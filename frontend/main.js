// let express = require('express');
// let router = express.Router();
// // const app = express();
// // socket server
// const SocketServer = require('ws').Server;

// //指定開啟的 port
// const PORT = 8080;

// //創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
// const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

// //將 express 交給 SocketServer 開啟 WebSocket 的服務
// const wss = new SocketServer({ server });
// // mqtt clientId
// const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);

const background = document.querySelector('.inner-header');
// g
const Element1 = document.querySelector('.bottle1 #bottle1');
const description1 = document.querySelector('.inner-header .description1');
const Element3 = document.querySelector('.bottle3 #bottle3');
// const description3 = document.querySelector('.inner-header .description3');
const Element4 = document.querySelector('.bottle4 #bottle4');
// const description4 = document.querySelector('.inner-header .description4');
const Element5 = document.querySelector('.bottle5 #bottle5');
// const description5 = document.querySelector('.inner-header .description5');

const Element2 = document.querySelector('.bottle2 #bottle2');
// const cancel = document.querySelector('.description1 .cancel');

// div
const bottle1 = document.querySelector('.bottle1');
const bottle2 = document.querySelector('.bottle2');
const bottle3 = document.querySelector('.bottle3');
const bottle4 = document.querySelector('.bottle4');
const bottle5 = document.querySelector('.bottle5');
// const bottle2 = document.querySelector('.bottle2');

let Visible1 = false;
let Visible3 = false;
let Visible4 = false;
let Visible5 = false;

// let Visible2 = false;



const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)

const host = 'ws://broker.emqx.io:8083/mqtt'
// topic
let topic1 = 'phone_topic';
let msg = '';
// mqtt
// let mqtt = require('mqtt');
// options
const options = {
  keepalive: 30,
  clientId: clientId,
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};
// var client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', options);

console.log('connecting mqtt client')
const client = mqtt.connect(host, options)

// console.log('connecting mqtt client');

client.on('error', err => {
  console.log('Connection error: ', err);
  client.end();
});

client.on('reconnect', () => {
  console.log('Reconnecting...');
});

client.on('connect', () => {
  console.log('Client connected:' + clientId);
  client.subscribe(topic1, { qos: 0 });

});

let counter = 0;
client.on('message', (topic, message, packet) => {
  console.log('Topic ' + topic + ' is connected~');
  msg = message.toString();
  console.log('msg : ' + msg);
  if (msg == 'normal') {
    console.log('normal');    
    // counter++;
    bottle2.style.display = ''; 
    var overlay = document.querySelector(".bottle2 .overlay");
    overlay.style.display = "none"; 
    setTimeout(() => {
      overlay.style.display = "";
    }, 900);  
    setTimeout(() => {
      bottle2.style.display = 'none';
    }, 1000);   //延後執行
  }else if (msg == 'important') {
    console.log('important');
    if(counter == 0){
      bottle1.style.display = '';
      // var overlay = document.querySelector(".bottle1 .overlay");
      // overlay.style.display = "none";
    //   setTimeout(() => {
    //     overlay.style.display = "";
    //   }, 350);  
    //   setTimeout(() => {
    //     overlay.style.display = "none";
    //  }, 1000);
    }else if(counter == 1){
      bottle3.style.display = '';
    //   var overlay = document.querySelector(".bottle3 .overlay");
    //   overlay.style.display = "none";
    //   setTimeout(() => {
    //     overlay.style.display = "";
    //   }, 350);  
    //   setTimeout(() => {
    //     overlay.style.display = "none";
    //  }, 1000);
    }else if (counter == 2) {
      bottle4.style.display = '';
    //   var overlay = document.querySelector(".bottle4 .overlay");
    //   overlay.style.display = "none";
    //   setTimeout(() => {
    //     overlay.style.display = "";
    //   }, 350);  
    //   setTimeout(() => {
    //     // var overlay = document.querySelector(".bottle4 .overlay");
    //     overlay.style.display = "none";
    //  }, 1000);
    }else{
      bottle5.style.display = '';
    //   var overlay = document.querySelector(".bottle5 .overlay");
    //   overlay.style.display = "none";
    //   setTimeout(() => {
    //     overlay.style.display = "";
    //   }, 350);  
    //   setTimeout(() => {
    //     // var overlay = document.querySelector(".bottle5 .overlay");
    //     overlay.style.display = "none";
    //  }, 1000); 
    }
    counter++;
    // console.log(counter);
  }
  //傳送到frontend
  //..
});


// /* GET home page. */
// app.get('/', function (req, res, next) {
// 	res.render({ msg: msg });
	// res.render("index", { title: "FKQ" });
// });
// app.get('/', (req, res) => {
//   res.render('index');
// })
// module.exports = router;

Element1.addEventListener('click', () => {
  Visible1 = !Visible1;
  console.log('click1');
  description1.style.display = '';
  setTimeout(() => {
    description1.style.display = 'none';
  }, 4000);
});


let bottlecount = 0;
background.addEventListener('click', () => {
  console.log(bottlecount);
  if (bottlecount == 0) {
    bottle1.style.display = '';
    // var overlay = document.querySelector(".bottle1 .overlay");
    // overlay.style.display = "none";
    // setTimeout(() => {
    //   overlay.style.display = "";
    // }, 350);
    // overlay.style.display = "none";
  } else if (bottlecount == 1) {    
    bottle2.style.display = '';
    // var overlay = document.querySelector(".bottle2 .overlay");
    // overlay.style.display = "none";
    // setTimeout(() => {
    //   overlay.style.display = "";
    // }, 1100);   //延後執行
    setTimeout(() => {
      bottle2.style.display = "none";
    }, 1700); 
  } else if (bottlecount == 2) {
    bottle3.style.display = '';
    // var overlay = document.querySelector(".bottle2 .overlay");
    // overlay.style.display = "none";
    // setTimeout(() => {
    //   overlay.style.display = "";
    // }, 1100);   //延後執行
  }  
  bottlecount++;
});


// let counter = 0;

function cancel() {
  description1.style.display = 'none';
}