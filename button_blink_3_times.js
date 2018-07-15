const onoff = require('onoff')

const Gpio = onoff.Gpio

const led = new Gpio(18, 'out')
const button = new Gpio(25, 'in', 'rising', { debounceTimeout: 10 })

const ligthOn = () => led.writeSync(1)
const lightOff = () => led.writeSync(0)

button.watch((err, value) => {
  if (err) {
    throw err
  }

  ligthOn()

  setTimeout(() => {
    lightOff()
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
