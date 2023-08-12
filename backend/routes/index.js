let express = require('express');
let router = express.Router();
// socket server
const SocketServer = require('ws').Server;

//指定開啟的 port
const PORT = 8080;

//創建 express 的物件，並綁定及監聽 3000 port ，且設定開啟後在 console 中提示
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });
// mqtt clientId
const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8);
// topic
let topic1 = 'phone_topic';
let msg = '';
// mqtt
let mqtt = require('mqtt');
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
var client = mqtt.connect('ws://broker.emqx.io:8083/mqtt', options);

console.log('connecting mqtt client');

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
client.on('message', (topic, message, packet) => {
	console.log('Topic '+topic+' is connected~');
	msg = message.toString();
	console.log('msg : ' + msg);
	//傳送到frontend
	//..

});


/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({ msg: msg });
	// res.render("index", { title: "FKQ" });
});
module.exports = router;

// const background = document.querySelector('.inner-header');
// // g
// const Element1 = document.querySelector('.bottle1 #bottle1');
// const description1 = document.querySelector('.inner-header .description1');
// const Element2 = document.querySelector('.bottle2 #bottle2');
// // const cancel = document.querySelector('.description1 .cancel');

// // div
// const bottle1 = document.querySelector('.bottle1');
// const bottle2 = document.querySelector('.bottle2');

// let Visible1 = false;
// // let Visible2 = false;


Element1.addEventListener('click', () => {
	Visible1 = !Visible1;
	console.log('click1');
	description1.style.display = '';
});


// let counter = 0;

background.addEventListener('click', () => {
	// console.log(counter);
	// console.log('clickback');
	// if (counter == 0) {
	//   bottle1.style.display = '';
	// }
	if (msg == 'normal') {
		// counter++;
		bottle2.style.display = '';
		setTimeout(() => {
			bottle2.style.display = 'none';
		}, 1800); // 两秒后执行   
	}else if(msg == 'important'){
		bottle1.style.display = '';
	}
	// console.log(counter);
});

function cancel() {
	description1.style.display = 'none';
}
