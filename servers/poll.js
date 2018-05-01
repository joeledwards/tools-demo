const c = require('@buzuli/color')
require('express')()
.get('/', (req, res) => {
  res.status((Date.now() / 1000 % 10 > 5) ? 200 : 404).send()
})
.listen(8888, () => {
  console.log(
    c.blue('Test with:'),
    'ops-tools site-poll -t 500 -p 1000 -c 200 http://localhost:8888/'
  )
  console.log(`Listening on port ${c.orange(8888)} ...`)
})
