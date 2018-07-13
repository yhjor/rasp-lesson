const onoff = require('onoff')

const GPIO = onoff.GPIO

const led = new GPIO(18, 'out')
const button = new GPIO(25, 'in', 'rising', { debounceTimeout: 10 })

button.watch(function(err, value) {
  if (err) {
    throw err
  }

  led.writeSync(led.readSync() ^ 1)
})

process.on('SIGINT', function() {
  led.writeSync(0)
  led.unexport()

  button.writeSync(0)
  button.unexport(0)

  console.log('Bye, bye!')
  process.exit()
})
