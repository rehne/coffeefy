#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Creation:    25.05.2016
#
# Copyright (c) 2013-2015 by Georg Kainzbauer <http://www.gtkdb.de>
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Notice by Vanakh Chea: Minor modifications were applied to the code

# import required modules
#from signal import signal, SIGPIPE, SIG_DFL
import time
import json
#import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt

with open('/home/pi/coffeefy/config.json', 'r') as f:
	data = json.load(f)

time.sleep(10)

mqttc = mqtt.Client("python_pub")
mqttc.connect(data['address'], data['mqtt'], 60)
mqttc.loop_start()

lastcoffee = data["timestamp"]
if ((time.time() - lastcoffee) % 60 <= 3):
	count = 10
	heattime = 10.0
elif ((time.time() - lastcoffee) % 60 <= 5):
	count = 20
	heattime = 20.0
elif ((time.time() - lastcoffee) % 60 <= 10):
	count = 35
	heattime = 35.0
elif ((time.time() - lastcoffee) % 60 <= 15):
	count = 55
	heattime = 55.0
else:
	count = 80
	heattime = 80.0


  # Ignore ERRNO 32
  #ODO: Prüfen, ob es noch notwendig ist, da "mqttc.loop_start()" errno 32 verhindert
  #signal(SIGPIPE, SIG_DFL)

  try:
    #Kontinuierliches Veröffentlichen der Distanzwerte auf das Topic "coffeefy/sensors/ultrasonic"
    while True:
      print "heattime..."
	  print("Heattime = %.1f cm" % heattime)
	  mqttc.publish("coffeefy/heattime", "%.1f" % heattime)
      time.sleep(2)

  # reset GPIO settings if user pressed Ctrl+C
  except KeyboardInterrupt:
    print("Measurement stopped by user")
  except:
	# Behandlung anderer Exceptions
	print "An error or exception occured!"
	#mqttc.publish("coffeefy/messages", "An error or exception occured!")

  # call main function
  main()
