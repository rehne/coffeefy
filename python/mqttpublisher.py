import json
import paho.mqtt.client as mqtt
import time

with open("../config.json", "r") as f:
    data = json.load(f)

mqttc = mqtt.Client("python_pub")
mqttc.connect(data["address"], data["mqtt"], 60)
mqttc.publish("coffeefy/messages", "Hello, World!")

def main():
    mqttc.publish("coffeefy/heattime", "1. %6.2f%%" % 10.0)
    time.sleep(3)
    mqttc.publish("coffeefy/heattime", "2. %6.2f" % 20.0)
main()
