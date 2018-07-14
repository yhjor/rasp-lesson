var sensorLib = require('node-dht-sensor')
sensorLib.initialize(11, 17)
var interval = setInterval(function() {
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
