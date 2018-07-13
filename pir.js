const { Gpio } = require('onoff')

const sensor = new Gpio(17, 'in', 'both')

sensor.watch((err, value) => {
  if (err) {
    exit(err)
  }

  console.log(value ? 'there is some one!' : 'not anymore!')
})

function exit(err) {
  if (err) {
    console.log('An error occurred', err)
  }

  sensor.unexport()
  console.log('Bye, bye!')
  process.exit()
}
