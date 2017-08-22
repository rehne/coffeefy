#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Testprogram: Nicht Projektrelevant.
# Schaltet das angeschlossene Relais.

import RPi.GPIO as GPIO
import time
import json
import sys
import paho.mqtt.client as mqtt

sys.stdout.flush()

with open('../config.json', 'r') as f:
	data = json.load(f)

mqttc = mqtt.Client("python_pub")
mqttc.connect(data['address'], data['mqtt'], 60)
mqttc.loop_start()

SIG = 19

GPIO.setmode(GPIO.BCM)

# set up GPIO pins
GPIO.setup(SIG, GPIO.OUT)
# set trigger to false
GPIO.output(SIG, False)

GPIO.output(SIG, True)
time.sleep(0.5)
GPIO.output(SIG, False)
mqttc.publish("coffeefy/messages", "Maschine laeuft.")
# print "ON"

time.sleep(3)

GPIO.output(SIG, True)
time.sleep(0.5)
GPIO.output(SIG, False)
mqttc.publish("coffeefy/messages", "Maschine ist ausgeschaltet.")
# print "OFF"

# sleep weil mqtt nachrichten sonst zu schnell hintereinander liegen
time.sleep(0.5)
mqttc.publish("coffeefy/messages", "Done")

sys.stdout.flush()

GPIO.cleanup()
