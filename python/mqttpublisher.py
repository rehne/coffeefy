import json
import paho.mqtt.client as mqtt
import time

with open("../config.json", "r") as f:
    data = json.load(f)

Distance = 2.0

mqttc = mqtt.Client("python_pub")
mqttc.connect(data["address"], data["mqtt"], 60)

def main():
    while True:
        time.sleep(1)
        mqttc.publish("coffeefy/ultrasonic", "%.1f" % Distance)
main()
