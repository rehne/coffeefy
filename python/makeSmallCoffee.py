#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Creation:    17.06.2016
#
# Copyright (c) 2016 by Vanakh Chea <https://github.com/kanonenfutter/>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.

import RPi.GPIO as GPIO
import json
import time
import paho.mqtt.client as mqtt

with open('../config.json', 'r') as f:
	data = json.load(f)

# Setup des mqtt-Clients
mqttc = mqtt.Client("python_pub")

mqttc.connect(data['address'], data['mqtt'], 30)

mqttc.loop_start()

# GPIO Pin Nummer zur Steuerung der Geraete Knoepfe
# 1CUP Taste / Relais #1
SIG_1CUP = 13
# POWER Taste / Relais #2
SIG_POWER = 19
# 2CUP Taste / Relais #3
SIG_2CUP = 26

GPIO.setmode(GPIO.BCM)

# set up GPIO pins. Set output-mode.
GPIO.setup(SIG_1CUP, GPIO.OUT)
GPIO.setup(SIG_2CUP, GPIO.OUT)
GPIO.setup(SIG_POWER, GPIO.OUT)

# Die folgenden Funktionen geben ein High Signal an die Knoepfe aus.
# Sie simulieren einen 0.5 sekuendigen Knopfdruck
def pressPowerBtn():
	GPIO.output(SIG_POWER, True)
	time.sleep(0.5)
	GPIO.output(SIG_POWER, False)

def press1CupBtn():
	GPIO.output(SIG_1CUP, True)
	time.sleep(0.5)
	GPIO.output(SIG_1CUP, False)

# Der folgende try-Konstruktion erlaubt bei Auftritt von Errors und Exceptions das GPIO-Programm sauber zu beenden.
# Mit GPIO.cleanup() werden saemtliche GPIO Ports zurueckgesetzt (in den input Modus) und freigegeben.
try:
	GPIO.output(SIG_POWER, False)
	GPIO.output(SIG_1CUP, False)
	GPIO.output(SIG_2CUP, False)

	# Lock UI
	mqttc.publish("coffeefy/status", '1');

	# Kaffeemaschine einschalten
	pressPowerBtn()

	# Je nach Zeitpunkt des letzten Kaffees die Zeit für den Heizvorgang wählen
	lastcoffee = data['timestamp']
	if ((lastcoffee - time.time()) % 60 <= 5):
		count = 20
		heattime = 20
	elif ((time.time() - lastcoffee) % 60 <= 10):
		count = 35
		heattime = 35
	elif ((time.time() - lastcoffee) % 60 <= 15):
		count = 50
		heattime = 50
	else:
		count = 65
		heattime = 65

	mqttc.publish("coffeefy/heattime", "%6.2f%% %" % heattime)

	while (count >=0):
		time.sleep(1)
		mqttc.publish("coffeefy/messages", 'Heating water... %6.2f%%' % (100-(count/heattime)*100))
		count -= 1
	# Auswahl des 1Cup Programms
	press1CupBtn()
	count = 30
	while (count >=0):
		time.sleep(1)
		mqttc.publish("coffeefy/messages", 'Preparing one cup... %6.2f%%' % (100-(count/30.0)*100))
		count -= 1
	for x in xrange(1,5):
		# Unlock UI
		mqttc.publish("coffeefy/status", '00');
		time.sleep(1)
	for x in xrange(1,5):
		mqttc.publish("coffeefy/messages", "Done!")
		time.sleep(1)
	# Kaffeemaschine ausschalten
	pressPowerBtn()

	# Zeitpunkt als timestamp in der config.json speichern
	data['timestamp'] = time.time()
	with open('../config.json', 'w') as f:
		json.dump(data, f, indent=2)

except KeyboardInterrupt:
	print "Program terminated by KeyboardInterrupt"
	mqttc.publish("coffeefy/messages", "Program terminated by KeyboardInterrupt")
except:
	# Behandlung anderer Exceptions
	print "An error or exception occured!"
	mqttc.publish("coffeefy/messages", "An error or exception occured!")
finally:
	GPIO.cleanup()
