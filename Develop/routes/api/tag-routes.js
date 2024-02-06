const express = require('express');
const router = express.Router();
const { Tag, Product } = require('../../models');

// GET all tags with their associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product],
  })
  .then((tags) => res.json(tags))
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

// GET a single tag by its ID with its associated Product data
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
  .then((tag) => {
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(tag);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

// POST a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((tag) => res.status(201).json(tag))
  .catch((err) => {
    console.error(err);
    res.status(400).json(err);
  });
});

// PUT to update a tag's name by its ID
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((num) => {
    if (num == 1) {
      res.status(200).send({ message: 'Tag was updated successfully.' });
    } else {
      res.status(404).send({ message: `Cannot update Tag with id=${req.params.id}. Maybe Tag was not found or req.body is empty!` });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: 'Error updating Tag with id=' + req.params.id,
    });
  });
});

// DELETE a tag by its ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: { id: req.params.id },
  })
  .then((num) => {
    if (num == 1) {
      res.status(200).send({ message: 'Tag was deleted successfully!' });
    } else {
      res.status(404).send({ message: `Cannot delete Tag with id=${req.params.id}. Maybe Tag was not found!` });
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send({
      message: 'Could not delete Tag with id=' + req.params.id,
    });
  });
});

module.exports = router;
