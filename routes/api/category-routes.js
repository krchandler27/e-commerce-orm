const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
   try {
    const categoryData = await Category.findAll(
      {
        include: [{
          model: Product,
          required: true
        }]
      });

    if (!categoryData) {
      res.status(404).json({ message: 'There are currently no categories in the database.' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
}});

  // find one category by its `id` value
  // be sure to include its associated Products
  router.get('/:id', async (req, res) => {
    try {
      const categoryData = await Category.findByPk(req.params.id,
        {
          include: [{
            model: Product,
            required: true
          }]
        });

      if (!categoryData) {
        res.status(404).json({ message: 'No category exists with inputted ID!' });
        return;
      }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
  }});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory)
  } catch(err) {
    res.status(500).json(err)
  }
});
// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category exists with inputted ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
    try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category exists with inputted ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
