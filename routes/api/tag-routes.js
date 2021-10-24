const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET - the /api/tags - GET all tags endpoint
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // be sure to include its associated Products
    include: [
       {
          model: Product,
          attributes: ['product_name', 'price', 'stock'],
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
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
       id: req.params.id,
    },
    // be sure to include its associated Products
    include: [
       {
          model: Product,
          attributes: ['product_name', 'price', 'stock'],
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
  // create a new tag
  Tag.create(req.body)
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
     console.log(err);
     res.status(500).json(err);
  });
});

// PUT - the /api/tags/1 - UPDATE Tag=1 endpoint
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
       id: req.params.id,
    },
 })
    .then(dbTagData => {
       // dbTagData[0] is the first element of the response Array, the id
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
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
       id: req.params.id,
    },
 })
    .then(dbTagData => {
       // dbTagData[0] is the first element of the response Array, the id
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
