const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');



// GET - the /api/products - GET all products endpoint
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    // order: [['created_at', 'DESC']],
    include: [
       {
          model: Category,
          attributes: ['category_name'],
       },
       {
          model: Tag,
          attributes: ['tag_name'],
       },
    ],
 })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// GET - the /api/products/1 - GET product=1 endpoint
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    // order: [['created_at', 'DESC']],
    where: {
      id: req.params.id,
   },
    include: [
       {
          model: Category,
          attributes: ['category_name'],
       },
       {
          model: Tag,
          attributes: ['tag_name'],
       },
    ],
 })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

// POST - the /api/products - CREATE one new product endpoint
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id ,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


// PUT - the /api/products/1 - UPDATE product=1 endpoint
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
       id: req.params.id,
    },
 })
    .then(dbProductData => {
       // dbCategoryData[0] is the first element of the response Array, the id
       if (!dbProductData) {
          res.status(404).json({ message: 'No product found with this id' });
          return;
       }
       res.json(dbProductData);
    })
    .catch(err => {
       console.log(err);
       res.status(500).json(err);
    });
});

module.exports = router;
