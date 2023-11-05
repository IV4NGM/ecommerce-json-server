const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.post('/', validateToken(secret), (req, res) => {
  const { id } = req.user
  const userId = id
  const orders = router.db.getState().orders
  const previousID = orders[0]?.orderId || 100
  const orderId = previousID + 1
  const currentDate = new Date().toLocaleDateString()
  const currentTime = new Date().toLocaleTimeString()

  const item = req.body
  const order = { ...item, orderId, userId, currentDate, currentTime }
  router.db.get('orders').unshift(order).write()
  res.send({ message: 'Order created successfully', data: order })
})

module.exports = router
