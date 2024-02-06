const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories with their associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  })
  .then((categories) => res.json(categories))
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

// GET a single category by its ID with its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product],
  })
  .then((category) => {
    if (!category) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

// POST a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
  .then((category) => res.status(201).json(category))
  .catch((err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

// PUT to update a category by its ID
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((num) => {
    if (num == 1) {
      res.status(200).json({ message: 'Category was updated successfully.' });
    } else {
      res.status(404).json({ message: `Cannot update Category with id=${req.params.id}. Maybe Category was not found or req.body is empty!` });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error updating Category with id=' + req.params.id });
  });
});

// DELETE a category by its ID
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id },
  })
  .then((num) => {
    if (num == 1) {
      res.status(200).json({ message: 'Category was deleted successfully!' });
    } else {
      res.status(404).json({ message: `Cannot delete Category with id=${req.params.id}. Maybe Category was not found!` });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Could not delete Category with id=' + req.params.id });
  });
});

module.exports = router;
