const express = require('express');
const router = express.Router();
const { Product } = require('../../models');

// GET all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// DELETE a product by its ID
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: 'Product was deleted successfully!' });
      } else {
        res.send({ message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Product with id=' + req.params.id,
      });
    });
});

// Export the router
module.exports = router;