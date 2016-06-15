#!/usr/bin/env python
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import time
import paho.mqtt.client as mqtt

mqttc = mqtt.Client("python_pub")
mqttc.connect("iot.eclipse.org", 1883, 60)


SIG_1CUP = 13
#GPIO pin of powerbutton relais(Relais #2)
SIG_POWER = 19

GPIO.setmode(GPIO.BCM)

# set up GPIO pins
GPIO.setup(SIG_1CUP, GPIO.OUT)
GPIO.setup(SIG_POWER, GPIO.OUT)

def pressPowerBtn():
	GPIO.output(SIG_POWER, True)
	time.sleep(0.5)
	GPIO.output(SIG_POWER, False)

def press1CupBtn():
	GPIO.output(SIG_1CUP, True)
	time.sleep(0.5)
	GPIO.output(SIG_1CUP, False)

try:
	#TODO: Kochvorgang
	GPIO.output(SIG_POWER, False)
	GPIO.output(SIG_1CUP, False)

	# Gerät einschalten
	pressPowerBtn()
	for x in xrange(0,90):
		#print 'Heating water... %d' % (9-x)
		mqttc.publish("coffeefy/messages", 'Heating water... %d' % (90-x))
		time.sleep(1)
	press1CupBtn()
	for x in xrange(0,30):
		#print 'Cooking one cup... %d' % (3-x)
		mqttc.publish("coffeefy/messages", 'Preparing one cup... %d' % (30-x))
		time.sleep(1)
	mqttc.publish("coffeefy/messages", "Done!")
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