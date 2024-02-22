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

// Get Single product by ID
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);
    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving product with id=' + req.params.id });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// PUT to update a product by its ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedProduct[0] > 0) {
      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a product by its ID
router.delete('/:id', async (req, res) => {
  try {
    const numDeleted = await Product.destroy({
      where: { id: req.params.id },
    });

    if (numDeleted > 0) {
      res.status(200).json({ message: 'Product was deleted successfully!' });
    } else {
      res.status(404).json({ message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not delete Product with id=' + req.params.id });
  }
});

// Export the router
module.exports = router;





// const express = require('express');
// const router = express.Router();
// const { Product } = require('../../models');

// // GET all products
// //THIS WORKS FINE!!
// router.get('/', async (req, res) => {
//   try {
//     const productData = await Product.findAll();
//     res.status(200).json(productData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error retrieving products' });
//   }
// });

// //Get Single product by ID
// //NEED THE CODE


// // POST a new product
// //THIS DOES NOT WORK!! What JSON parameters are needed here?
// router.post('/', async (req, res) => {
//   try {
//     const newProduct = await Product.create({
//       product_name: req.body.product_name,
//       // Include other product fields as necessary 
//       // id | product_name | price | stock | category_id |
//      //    1| Plain T-Shirt|    15 |    14 |           1 |
//     });
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json(err);
//   }
// });

// // PUT to update a product by its ID
// //THIS WORKS FINE!!
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedProduct = await Product.update(req.body, {
//       where: { id: req.params.id },
//     });

//     if (updatedProduct[0] > 0) {
//       res.status(200).json({ message: 'Product updated successfully' });
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// // DELETE a product by its ID
// //THIS WORKS FINE!!
// router.delete('/:id', async (req, res) => {
//   try {
//     const numDeleted = await Product.destroy({
//       where: { id: req.params.id },
//     });

//     if (numDeleted > 0) {
//       res.status(200).json({ message: 'Product was deleted successfully!' });
//     } else {
//       res.status(404).json({ message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!` });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Could not delete Product with id=' + req.params.id });
//   }
// });

// // Export the router
// module.exports = router;

