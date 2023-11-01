const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/', validateToken(secret), (req, res) => {
  const { email } = req.body
  const orders = router.db.get('orders')

  const ordersUser = orders.filter(order => {
    return order.email === email
  })

  if (ordersUser.length === 0) {
    res.send({ result: 'NO-ORDERS', message: 'There are no orders' })
  } else {
    res.send({ result: ordersUser.length, message: 'There are orders', data: ordersUser})
  }
})

module.exports = router
