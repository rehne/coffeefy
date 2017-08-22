import json
import paho.mqtt.client as mqtt
import time

with open('../config.json', 'r') as f:
    data = json.load(f)

mqttc = mqtt.Client("python_pub")
mqttc.connect(data['address'], data['mqtt'], 60)
mqttc.publish("coffeefy/messages", "Hello, World!")

def main():
 	mqttc.publish("coffeefy/messages", "Starting machine...")
	time.sleep(10)
	mqttc.publish("coffeefy/messages", "Working...")
	time.sleep(10)
	mqttc.publish("coffeefy/messages", "Done!")

main()
