# coffeefy

## Description

Coffeefy let you control a coffee maker via the Internet using a RESTful API provided by an express.js-server. However, this system isn't reliable yet and should run under supervision.

## System architecture
![Systemarchitektur](https://cdn.rawgit.com/rehne/coffeefy/b97ae538/docs/Architekturdiagram%20IoT%203.0.svg)
## Used hardware

- Raspberry Pi 3
- Senseo 7810 Coffee Machine
- HC-SR04 Ultrasonic Sensor
- 3 Relays
- 2 Resistors(680Ohm/1kOhm)
- minor small parts (optional breadboard, wires etc.)

## Installation
- clone repository
- navigate to ./node
- run `npm install` to install the dependencies
- To start the webserver, run: `nodemon app` or `node ./bin/www`
- open `http://localhost:3000` in your browser

You can run Coffeefy as a daemon service using "forever". (see below)
After Installation you can start the node.js server by running `forever start ./bin/www`.
To see what's going on, determine the logfile path by running `forever list` and run
`tail -f <logfilepath>`

(Instructions for running `ultrasonic.py` in background)


## Required Python libraries
- RPi.GPIO via `sudo apt-get install rpi.gpio`
- paho-mqtt via `pip install paho-mqtt`

## Useful node.js modules and other ressources
- [mqtt.js](https://github.com/mqttjs/MQTT.js)
- [python-shell](https://github.com/extrabacon/python-shell)
- [Correct usage of GPIO.cleanup()](http://raspi.tv/2013/rpi-gpio-basics-3-how-to-exit-gpio-programs-cleanly-avoid-warnings-and-protect-your-pi)
- Running a node js server.. [forever(Github-Repo)](https://github.com/foreverjs/forever)
- [nodemon](http://nodemon.io/) monitors for any changes in source, restarts the server automatically if necessary.




## Troubleshooting
- Installing paho-mqtt causes an error. Missing "Python.h"? → Install the python developer package via `apt-get install python2.7-dev`.
- `node app.js` results in a crash. → <s>I dunno Y,  just install `nodemon` via npm.</s> →  `node ./bin/www`


## Authors
[Vanakh Chea](https://github.com/kanonenfutter/), [Alexander Thürling](https://github.com/revanjin), [René Honnen](https://github.com/rehne), [Christian Krenn](https://github.com/Cuhater/)

## License

[GNU](LICENSE)
