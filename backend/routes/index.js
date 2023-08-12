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
	//client.subscribe('phone_topic', { qos: 0 });
	// setInterval(() => {
	//   client.publish("sohappy", "sohappy", { qos: 0, retain: false });
	// }, 1000);
});
client.on('message', (topic, message, packet) => {
	console.log('Topic '+topic+' is connected~');
	msg = message.toString();
	console.log('msg : ' + msg);
	//ws.send(JSON.stringify(msg));

});
/*
//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {
	//連結時執行此 console 提示
	console.log('Client connected');
	client.on('message', (topic, message, packet) => {
			console.log('Topic '+topic+' is connected~');
			msg = message.toString();
			console.log('msg : ' + msg);
			ws.send(JSON.stringify(msg));
		
		//if (topic === 'phone_topic') {
		//	let msg2 = message.toString();
		//	console.log('msg : ' + msg2);
		//}
	});
*/
/*
	ws.on('message', data => {
		let value = JSON.parse(data);
		console.log('value : ' + value.status);
		let signal = '';
		if (value.status == true) {
			signal = 'open';
		} else {
			signal = 'close';
		}
		client.publish('phone_topic', signal, { qos: 0, retain: false });
	});
	//當 WebSocket 的連線關閉時執行
	ws.on('close', () => {
		console.log('Close connected');
	});
});
*/

/* GET home page. */
router.get('/', function (req, res, next) {
	res.send({ msg: msg });
	// res.render("index", { title: "FKQ" });
});

module.exports = router;
