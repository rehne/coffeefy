#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Testprogram: Nicht Projektrelevant.
# Schaltet das angeschlossene Relais.

import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

mqttc = mqtt.Client("python_pub")
mqttc.connect("iot.eclipse.org", 1883, 60)

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

GPIO.cleanup()
