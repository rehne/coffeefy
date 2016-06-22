#!/usr/bin/env python

import time
import RPi.GPIO as GPIO

GPIO.output(4, True)
time.sleep(0.01)
GPIO.output(4, False)
