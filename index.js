var onoff = require('onoff')

console.info('Hello from the other side')

var Gpio = onoff.Gpio
var led = new Gpio(4, 'out')
var interval

interval = setInterval(function() {
  var value = (led.readSync() + 1) % 2
  led.write(value, function() {
    console.log('Changed LED to:' + value)
  })
}, 2000)

process.on('SIGINT', function() {
  clearInterval(interval)
  led.writeSync(0)
  led.unexport()
  console.log('Bye, bye!')
  process.exit()
})
