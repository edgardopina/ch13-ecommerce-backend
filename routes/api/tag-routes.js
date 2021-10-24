const router = require('express').Router(); // import Router
const { Tag, Product, ProductTag } = require('../../models'); // import models


// GET - the /api/tags - GET all tags endpoint
router.get('/', (req, res) => {
  Tag.findAll({
    // including its associated Products
    include: [
       {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
       },
    ],
 })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// GET - the /api/tags/1 - GET Tag=1 endpoint
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
       id: req.params.id,
    },
    // including its associated Products
    include: [
       {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock'],
       },
    ],
 })
    .then(dbTagData => {
       if (!dbTagData) {
          res.status(404).json({ message: 'No tag found with this id' });
          return;
       }
       res.json(dbTagData);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// POST - the /api/tags - CREATE one new Tag endpoint
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
     console.log(err);
     res.status(500).json(err);
  });
});

// PUT - the /api/tags/1 - UPDATE Tag=1 endpoint
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
       id: req.params.id,
    },
 })
    .then(dbTagData => {
       if (!dbTagData[0]) {
          res.status(404).json({ message: 'No Tag found with this id' });
          return;
       }
       res.json(dbTagData);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// DELETE - the /api/tags/1 - DELETE Tag=1 endpoint
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
       id: req.params.id,
    },
 })
    .then(dbTagData => {
       if (!dbTagData) {
          res.status(404).json({ message: 'No Tag found with this id' });
          return;
       }
       res.json(dbTagData);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

module.exports = router;
