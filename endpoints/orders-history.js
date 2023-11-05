const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.get('/', validateToken(secret), (req, res) => {
  const { id } = req.user
  if (!id) {
    res.status(400).send({
      message: 'A valid user ID must be provided'
    })
    return
  }
  const orders = router.db.getState().orders

  const ordersUser = orders.filter((order) => {
    return order.userId === id
  })

  if (ordersUser.length === 0) {
    res.status(404).send({ message: 'There are NO orders' })
  } else {
    res.status(200).send({ message: `There are ${ordersUser.length} orders`, data: ordersUser })
  }
})

module.exports = router
