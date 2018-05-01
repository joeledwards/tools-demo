const c = require('@buzuli/color')
require('express')()
.get('/', (req, res) => {
  const {
    status = 200,
    payload = 'Hola, aqui!'
  } = req.query
  res.status(status).send(payload)
})
.listen(8888, () => {
  console.log(
    c.blue('Test with:'),
    'aqui get http://localhost:8888/?status=204&payload=adios)'
  )
  console.log(`Listening on port ${c.orange(8888)} ...`)
})
