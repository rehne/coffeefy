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
from signal import signal, SIGPIPE, SIG_DFL
import time
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt

mqttc = mqtt.Client("python_pub")
mqttc.connect("test.mosquitto.org", 1883, 60)
mqttc.loop_start()

# define GPIO pins 
TRIG = 4
ECHO = 18
StartTime = 0
StopTime = 0

# function to measure the distance
def MeasureDistance():
  # set trigger to high
  GPIO.output(TRIG, True)

  # set trigger after 10µs to low
  time.sleep(0.00001)
  # time.sleep(3.0)
  GPIO.output(TRIG, False)

  # store initial start time
  StartTime = time.time()

  # store start time
  while GPIO.input(ECHO) == 0:
    StartTime = time.time()

  # store stop time
  while GPIO.input(ECHO) == 1:
    StopTime = time.time()

  # calculate distance
  TimeElapsed = StopTime - StartTime
  Distance = (TimeElapsed * 34300) / 2

  return Distance

# main function
def main():

  # Ignore ERRNO 32
  #TODO: Prüfen, ob es noch notwendig ist, da "mqttc.loop_start()" errno 32 verhindert
  signal(SIGPIPE, SIG_DFL)

  try:
    #Kontinuierliches Veröffentlichen der Distanzwerte auf das Topic "coffeefy/sensors/ultrasonic"
    while True:
      print "reading..."
      Distance = MeasureDistance()
      #print("Measured Distance = %.1f cm" % Distance)
      mqttc.publish("coffeefy/sensors/ultrasonic", "%.1f" % Distance)
      mqttc.publish("coffeefy/sensors/ultrasonic", "Hello World")
      time.sleep(1)

  # reset GPIO settings if user pressed Ctrl+C
  except KeyboardInterrupt:
    print("Measurement stopped by user")
  except:
	# Behandlung anderer Exceptions
	print "An error or exception occured!"
	#mqttc.publish("coffeefy/messages", "An error or exception occured!")
  finally:
    GPIO.cleanup()
    print "..."

if __name__ == '__main__':
  GPIO.setwarnings(True)
  # use GPIO pin numbering convention
  GPIO.setmode(GPIO.BCM)

  # set up GPIO pins
  GPIO.setup(TRIG, GPIO.OUT)
  GPIO.setup(ECHO, GPIO.IN)
  print "setup done"
  # set trigger to false
  GPIO.output(TRIG, False)

  # call main function
  main()
