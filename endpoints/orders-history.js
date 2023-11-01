const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/', validateToken(secret), (req, res) => {
  const { email } = req.body
  const orders = router.db.get('orders').__wrapped__.orders

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
