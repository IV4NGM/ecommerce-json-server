const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.post('/', validateToken(secret), (req, res) => {
  const orders = router.db.get('orders')
  const previousID = orders[0]?.orderId || 100
  const orderId = previousID + 1

  const item = req.body
  const order = { ...item, orderId }
  router.db.get('orders').unshift(order).write()
  res.send({ message: 'Order created successfully', orderId })
})

module.exports = router
