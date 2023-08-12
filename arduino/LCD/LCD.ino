#include <Wire.h>
#include <LiquidCrystal_I2C.h> 
LiquidCrystal_I2C lcd(0x27,16,2); 

int TimeHours =  0;
int TimeMinutes =  0;
int TimeSeconds =  0;

bool countDown=true;
bool get_time = false;
int Buzzer =12;

unsigned long interval=1000; 
unsigned long previousMillis=0;

int potPin = 0; //定義可變電阻讀取接腳
int val = 0 ; //定義可變電阻讀取數儲暫存用的變數
int voltage = 0; //輸入LED的電壓值

void setup() {
    Serial.begin(9600);

    //定義可變電阻讀取接腳為輸入
    pinMode(potPin, INPUT); 

    //LCD
    lcd.init();
    lcd.backlight();
    lcd.print("Adjustable Timer"); 
    lcd.setCursor(0,1);
    lcd.print("Under the sea");
    delay(2000);
    lcd.clear();
    //pinMode(Buzzer, OUTPUT);
    
    set_Time();
}

void loop() { 
  //讀取可變電阻電壓值
  val = analogRead(potPin); //val = 0 ~ 1023
  voltage = map(val, 0, 1023, 0, 255); //將val由0~1023線性變換為0~255並存入voltage
    
  if(countDown)printSerial();//print

  delay(500);
  
  if(voltage>250 && countDown){
    get_time = true;
    Show_Time();
    count_Down();    
  }
}

void set_Time(){
  TimeHours =  0;
  TimeMinutes =  0;
  TimeSeconds =  5;
}

void count_Down(){
  if(TimeHours == 0 && TimeMinutes == 0 && TimeSeconds == 0){
    timeIsUp();
  }

  else if(TimeSeconds <= 0){
    TimeSeconds = 59;
    TimeMinutes = TimeMinutes - 1;
  }
  else if(TimeMinutes < 0){
    TimeMinutes = 59;
    TimeHours = TimeHours - 1;
  }
  else{
    get_time = true;
    counter();
    Show_Time();   
  }
}
void Show_Time(){
  // Turn on the display
  lcd.display();

  lcd.setCursor(0, 0); //top left
  lcd.print("Time: ");

  lcd.setCursor(0, 1);
  lcd.print(TimeHours);
  lcd.print("hrs ");

  lcd.setCursor(4, 1); 
  lcd.print(TimeMinutes);
  lcd.print("mins ");

  lcd.setCursor(8, 1);
  lcd.print(TimeSeconds);
  lcd.print("secs ");

}
  
void counter() {
  unsigned long currentMillis = millis(); // 當前時間
  // 檢查interval是否超過（1000毫秒）
  if ((unsigned long)(currentMillis - previousMillis) >= interval) {
    if(get_time == true){
      TimeSeconds--;
      get_time = false;
    }
    previousMillis = millis();
  }
}

void timeIsUp(){
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(" Time is UP");
  lcd.setCursor(0, 1);
  lcd.print(" Beep Beep");
  countDown=false;
  Serial.print("Time's up!");
}

void printSerial(){
  //印出數值val檢查執行成果
  Serial.print("val = ");
  Serial.print(val);
  Serial.print(";   voltage = ");
  Serial.println(voltage);
  //印出數值time
  Serial.print("val = ");
  Serial.print(TimeHours);
  Serial.print(":");
  Serial.print(TimeMinutes);
  Serial.print(":");
  Serial.println(TimeSeconds);
  delay(500);
}
