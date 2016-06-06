# -*- coding: utf-8 -*-
import paho.mqtt.client as mqtt
import time

mqttc = mqtt.Client("python_pub")
mqttc.connect("iot.eclipse.org", 1883, 60)
mqttc.publish("coffeefy/messages", "Hello, World!")
#timeout = 2s
#mqttc.loop(2)

def main():
 	mqttc.publish("coffeefy/messages", "Starting machine...")
	time.sleep(10)
	mqttc.publish("coffeefy/messages", "Working...")
	time.sleep(10)
	mqttc.publish("coffeefy/messages", "Done!")

main()