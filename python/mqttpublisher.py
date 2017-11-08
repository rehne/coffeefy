import json
import paho.mqtt.client as mqtt
import time

with open("../config.json", "r") as f:
    data = json.load(f)

mqttc = mqtt.Client("python_pub")
mqttc.connect(data["address"], data["mqtt"], 60)

def main():
    time.sleep(1)
    mqttc.publish("coffeefy/heattime", "%.1f" % 2.0)
main()
