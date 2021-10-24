const router = require('express').Router(); // import Router
const { Category, Product } = require('../../models'); // import models


// GET - the /api/categories - GET all categories endpoint
router.get('/', (req, res) => {
   Category.findAll({
      // including its associated Products
      include: [
         {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock'],
         },
      ],
   })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET - the /api/categories/1 - GET category=1 endpoint
router.get('/:id', (req, res) => {
   Category.findOne({
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
      .then(dbCategoryData => {
         if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
         }
         res.json(dbCategoryData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST - the /api/categories - CREATE one new category endpoint
router.post('/', (req, res) => {
   Category.create(req.body)
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// PUT - the /api/categories/1 - UPDATE category=1 endpoint
router.put('/:id', (req, res) => {
   Category.update(req.body, {
      where: {
         id: req.params.id,
      },
   })
      .then(dbCategoryData => {
         if (!dbCategoryData[0]) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
         }
         res.json(dbCategoryData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE - the /api/categories/1 - DELETE category=1 endpoint
router.delete('/:id', (req, res) => {
   Category.destroy({
      where: {
         id: req.params.id,
      },
   })
      .then(dbCategoryData => {
         if (!dbCategoryData) {
            res.status(404).json({ message: 'No category found with this id' });
            return;
         }
         res.json(dbCategoryData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
