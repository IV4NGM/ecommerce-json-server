const router = require('express').Router()
const { validateToken } = require('../middlewares/jwt_validation')
const { secret } = require('../config.js')

router.put('/:id', validateToken(secret), (req, res) => {
  const { role } = req.user // Obtener el rol del usuario desde el token decodificado
  const newItem = { ...req.body }
  const id = req.params.id

  if (role !== 'ADMIN') {
    return res.status(403).send({ message: 'Forbidden. Only ADMIN can modify items.' })
  }

  const items = router.db.getState().items

  const index = items.findIndex(product => product.id === id)

  if (index === -1) {
    res.status(400).send({ message: 'Product not found' })
  } else {
    const previousItem = router.db.get('items').__wrapped__.items[index]
    console.log(router.db.get('items'))
    console.log('index', index)
    console.log('previousItem', previousItem)
    for (const key of Object.keys(previousItem)) {
      if (!(Object.keys(newItem).includes(key))) {
        newItem[key] = previousItem[key]
      }
    }
    router.db.get('items').splice(index, 1).write()
    router.db.get('items').push(newItem).write()
    res.send({ message: 'Item modified successfully' })
  }
})

module.exports = router
