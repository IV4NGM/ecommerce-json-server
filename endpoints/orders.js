const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.post('/', validateToken(secret), (req, res) => {
  const { id } = req.user
  const userId = id
  const orders = router.db.getState().orders
  const previousID = orders[0]?.orderId || 100
  const orderId = previousID + 1
  const orderDate = new Date().toDateString()
  const orderTime = new Date().toTimeString()

  const item = req.body
  const order = { ...item, orderId, userId, orderDate, orderTime }
  router.db.get('orders').unshift(order).write()
  res.send({ message: 'Order created successfully', data: order })
})

module.exports = router
