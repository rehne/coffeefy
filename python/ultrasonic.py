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
import time
import RPi.GPIO as GPIO

# define GPIO pins
TRIG = 4
ECHO = 18

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
    Distance = MeasureDistance()
    print(Distance)

  # try:
  #   while True:
  #     Distance = MeasureDistance()
  #     print("Measured Distance = %.1f cm" % Distance)
  #     time.sleep(1)

  # reset GPIO settings if user pressed Ctrl+C
  # except KeyboardInterrupt:
  #   print("Measurement stopped by user")
  #   GPIO.cleanup()

if __name__ == '__main__':
  # use GPIO pin numbering convention
  GPIO.setmode(GPIO.BCM)

  # set up GPIO pins
  GPIO.setup(TRIG, GPIO.OUT)
  GPIO.setup(ECHO, GPIO.IN)

  # set trigger to false
  GPIO.output(TRIG, False)

  # call main function
  main()
