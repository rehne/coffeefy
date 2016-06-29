# coffeefy

## Description

Coffeefy let you control a coffee maker via Internet

## Used hardware

- Raspberry Pi 3
- Senseo 7810 Coffee Machine
- HC-SR04 Ultrasonic Sensor
- 3 Relays
- 2 Resistors(680Ohm/1kOhm)
- minor small parts (optinal breadboard, wires etc.)

## Installation
- clone repository
- navigate to ./node
- run `npm install` to install the dependencies
- To start the webserver, run: `nodemon app`
- open `http://localhost:3000` in browser

## Required Python libraries
- RPi.GPIO via `sudo apt-get install rpi.gpio`
- paho-mqtt via `pip install paho-mqtt`

## Useful node.js modules and other ressources
- [mqtt.js](https://github.com/mqttjs/MQTT.js)
- [python-shell](https://github.com/extrabacon/python-shell)
- [Correct usage of GPIO.cleanup()](http://raspi.tv/2013/rpi-gpio-basics-3-how-to-exit-gpio-programs-cleanly-avoid-warnings-and-protect-your-pi)

## Troubleshooting
- Installing paho-mqtt causes an error. Missing "Python.h"? → Install the python developer package via `apt-get install python2.7-dev`.
- `node app.js` results in a crash. → I dunno Y,  just install `nodemon` via npm.


## Authors
[Vanakh Chea](https://github.com/kanonenfutter/), [Alexander Thürling](https://github.com/revanjin), [René Honnen](https://github.com/rehne)

## License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
