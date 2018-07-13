const onoff = require('onoff')

console.info('Hello from the other side')

const Gpio = onoff.Gpio
const led = new Gpio(18, 'out')
let interval

interval = setInterval(function() {
  let value = (led.readSync() + 1) % 2
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
