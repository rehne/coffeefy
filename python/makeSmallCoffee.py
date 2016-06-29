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
import time
import paho.mqtt.client as mqtt

# Setup des mqtt-Clients
mqttc = mqtt.Client("python_pub")
mqttc.connect("iot.eclipse.org", 1883, 60)


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

def press2CupBtn():
	GPIO.output(SIG_2CUP, True)
	time.sleep(0.5)
	GPIO.output(SIG_2CUP, False)

# Der folgende try-Konstruktion erlaubt bei Auftritt von Errors und Exceptions das GPIO-Programm sauber zu beenden.
# Mit GPIO.cleanup() werden saemtliche GPIO Ports zurueckgesetzt (in den input Modus) und freigegeben.
try:
	GPIO.output(SIG_POWER, False)
	GPIO.output(SIG_1CUP, False)
	GPIO.output(SIG_2CUP, False)

	# Kaffeemaschine einschalten
	pressPowerBtn()
	for x in xrange(0,90):
		#print 'Heating water... %d' % (9-x)
		mqttc.publish("coffeefy/messages", 'Heating water... %d' % (90-x))
		time.sleep(1)
	# Auswahl des 1CUP Programms
	press1CupBtn()
	for x in xrange(0,40):
		#print 'Cooking one cup... %d' % (4-x)
		mqttc.publish("coffeefy/messages", 'Preparing one cup... %d' % (40-x))
		time.sleep(1)
	mqttc.publish("coffeefy/messages", "Done!")
	# Kaffeemaschine ausschalten
	pressPowerBtn()

except KeyboardInterrupt:
	print "Program terminated by KeyboardInterrupt"
	mqttc.publish("coffeefy/messages", "Program terminated by KeyboardInterrupt")
except:
	# Behandlung anderer Exceptions
	print "An error or exception occured!"
	mqttc.publish("coffeefy/messages", "An error or exception occured!")
finally:
	GPIO.cleanup()
