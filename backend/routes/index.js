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
