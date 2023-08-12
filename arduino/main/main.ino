#include <Wire.h>

#include <Arduino_LSM6DS3.h>
#include <SPI.h>

#include <stdio.h>
#include <WiFiNINA.h>
#include <ArduinoMqttClient.h>
#include "arduino_secrets.h"

// 按鍵的接腳
const int BTN_Urgent_PIN = 7;
const int BTN_Normal_PIN = 8;
// 5V的接腳
const int FIVEV =  5;
// 按鈕的狀態
int buttonUState = 0;
int buttonNState = 0;

//wifi
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;

//mqtt設定
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);
const char broker[] = "broker.emqx.io";
int        port     = 1883;

//傳輸
const char phone_topic[]  = "phone_topic";

//set interval for sending messages (milliseconds)
const long interval = 5000;
unsigned long previousMillis = 0;

void setup(void) {
  Serial.begin(9600);
  
  //設定5V腳位
  pinMode(FIVEV, OUTPUT); 
  //設定按鈕的接腳為輸入，因為我們要讀取它的狀態
  pinMode(BTN_Urgent_PIN, INPUT); 
  pinMode(BTN_Normal_PIN, INPUT); 

  connectWifi();
  connectMQTT();

  Serial.print("Subscribing to topic: ");
  Serial.println(phone_topic);
  Serial.println();
  mqttClient.subscribe(phone_topic);

}

void loop() {
    // call poll() regularly to allow the library to send MQTT keep alive which
    // avoids being disconnected by the broker
    mqttClient.poll();

    //讀取BTN狀態
    digitalWrite(FIVEV, HIGH);
    buttonUState = digitalRead(BTN_Urgent_PIN);  
    buttonNState = digitalRead(BTN_Normal_PIN); 
    //偵測哪個BTN按下
    unsigned long currentMillis = millis();

    if (currentMillis - previousMillis >= interval) {
      // save the last time a message was sent
      previousMillis = currentMillis;
      detectMessage();
    }
}

void detectMessage() {
    if(buttonUState == HIGH){//如果按下重要聯絡人 
      Serial.println("Important!!");
      mqttClient.beginMessage(phone_topic);
      mqttClient.print("important");
      mqttClient.endMessage();
  }
  else if(buttonUState == LOW){ 
    Serial.print("Important=");
    Serial.print(NULL);
    Serial.print("\n");
    delay(1000);
  }
  if(buttonNState == HIGH){//如果按下一般聯絡人
      Serial.println("Normal!");
      mqttClient.beginMessage(phone_topic);
      mqttClient.print("normal");
      mqttClient.endMessage();
  }else{
    Serial.print("Normal=");
    Serial.print(NULL);
    Serial.print("\n");
    delay(1000);
  }
}

void connectWifi(){
  // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to WPA SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    // failed, retry
    Serial.print(".");
    delay(5000);
  }
  
  Serial.println("You're connected to the network");
  Serial.println();
}

void connectMQTT(){
  // attempt to connect to MQTT:
  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }
  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

}
