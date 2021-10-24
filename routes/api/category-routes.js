const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET - the /api/categories - GET all categories endpoint
router.get('/', (req, res) => {
   // find all categories
   Category.findAll({
      // be sure to include its associated Products
      include: [
         {
            model: Product,
            attributes: ['product_name', 'price', 'stock'],
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
   // find one category by its `id` value
   Category.findOne({
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
      .then(dbCategoryData => {
         if (!dbCategoryData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
         }
         res.json(dbCategoryData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST - the /api/categories - CREATE one category endpoint
router.post('/', (req, res) => {
   // create a new category
   Category.create({
      category_name: req.body.category_name,
   })
      .then(dbCategoryData => res.json(dbCategoryData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// PUT - the /api/categories/1 - UPDATE category=1 endpoint
router.put('/:id', (req, res) => {
   // update a category by its `id` value
   Category.update(req.body, {
      where: {
         id: req.params.id,
      },
   })
      .then(dbCategoryData => {
         // dbCategoryData[0] is the first element of the response Array, the id
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
   // delete a category by its `id` value
   Category.destroy({
    where: {
       id: req.params.id,
    },
 })
    .then(dbCategoryData => {
       // dbCategoryData[0] is the first element of the response Array, the id
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
