const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.delete('/', validateToken(secret), (req, res) => {
  const { id } = req.body

  if (!id) {
    res.status(400).send({
      message: 'A valid ID must be provided'
    })
    return
  }

  const { role } = req.user // Obtener el rol del usuario desde el token decodificado

  if (role !== 'ADMIN') {
    return res.status(403).send({ message: 'Forbidden. Only ADMIN can delete items.' })
  }

  const items = router.db.getState().items

  const index = items.findIndex(product => product.id === id)

  if (index === -1) {
    res.status(400).send({ message: 'Product not found' })
  } else {
    router.db.get('items').splice(index, 1).write()
    res.send({ message: `Product deleted successfully. There are ${router.db.getState().items.length} elements left.` })
  }
})

module.exports = router
