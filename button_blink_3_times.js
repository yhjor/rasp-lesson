const onoff = require('onoff')

const Gpio = onoff.Gpio

const led = new Gpio(18, 'out')
const button = new Gpio(25, 'in', 'rising', { debounceTimeout: 10 })

button.watch((err, value) => {
  if (err) {
    throw err
  }

  // led.writeSync(led.readSync() ^ 1)
  led.writeSync(1)

  setTimeout(() => {
    led.writeSync(0)
  }, 2000)
})

process.on('SIGINT', function() {
  led.writeSync(0)
  led.unexport()

  button.writeSync(0)
  button.unexport(0)

  console.log('Bye, bye!')
  process.exit()
})
