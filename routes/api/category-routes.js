const router = require('express').Router()
const { Category, Product } = require('../../models')

// The `/api/categories` endpoint

// Route to find all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {
        include: [{
          model: Product
        }]
      })
    if (!categoryData) {
      res.status(404).json({ message: 'There are currently no categories in the database.' })
      return
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Find one category by its `id` value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id,
      {
        include: [{ 
          model: Product 
        }]
      })

    if (!categoryData) {
      res.status(404).json({ message: 'No category exists with inputted ID!' })
      return
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category exists with inputted ID!' })
      return
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category exists with inputted ID!' })
      return
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router
