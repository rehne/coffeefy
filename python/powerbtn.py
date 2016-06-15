#!/usr/bin/env python
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

mqttc = mqtt.Client("python_pub")
mqttc.connect("iot.eclipse.org", 1883, 60)

GPIO.setmode(GPIO.BCM)

# set up GPIO pins
GPIO.setup(17, GPIO.OUT)
# set trigger to false
GPIO.output(17, False)

GPIO.output(17, True)
time.sleep(0.01)
GPIO.output(17, False)
mqttc.publish("coffeefy/messages", "Maschine läuft.")

time.sleep(3)

GPIO.output(17, True)
time.sleep(0.01)
GPIO.output(17, False)
mqttc.publish("coffeefy/messages", "Maschine ist ausgeschaltet.")

GPIO.cleanup()
