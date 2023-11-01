const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/', validateToken(secret), (req, res) => {
  const { email } = req.body
  if (!email) {
    res.status(400).send({
      message: 'A valid email must be provided'
    })
    return
  }
  const orders = router.db.getState().orders

  const ordersUser = orders.filter((order) => {
    return order.email === email
  })

  if (ordersUser.length === 0) {
    res.send({ message: 'There are NO orders' })
  } else {
    res.send({ message: `There are ${ordersUser.length} orders`, data: ordersUser })
  }
})

module.exports = router
