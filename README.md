# coffeefy

## Description

Coffeefy let you control a Coffee maker via Internet

## Used hardware

- Raspberry Pi

## Installation
- clone repository
- navigate to ./node
- run `npm install` to install the dependencies
- To start the webserver, run: `nodemon app`
- open `http://localhost:3000` in browser

## Required Python libraries
- RPi.GPIO via `sudo apt-get install rpi.gpio`
- paho-mqtt via `pip install paho-mqtt`

## Troubleshooting
Installing paho-mqtt might throw an error. Install the python developer package via `apt-get install python2.7-dev`


## Authors
[Vanakh Chea](https://github.com/kanonenfutter/), [Alexander Thürling](https://github.com/athuerli), [René Honnen](https://github.com/rehne)

## License

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
