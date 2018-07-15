var sensorLib = require('node-dht-sensor')
var onoff = require('onoff')
const Gpio = onoff.Gpio
const led = new Gpio(18, 'out')

sensorLib.initialize(11, 17)

const ligthOn = () => led.writeSync(1)
const lightOff = () => led.writeSync(0)

var interval = setInterval(function() {
  var readout = sensorLib.read()
  const temperature = readout.temperature
  console.log('temperature', temperature)

  if (temperature >= 30) {
    ligthOn()
  } else {
    lightOff()
  }

  read()
}, 2000)

function read() {
  var readout = sensorLib.read()
  console.log(
    'Temperature : ' +
      readout.temperature.toFixed(2) +
      'C ' +
      'humidity: ' +
      readout.humidity.toFixed(2) +
      '%',
  )
}
