import Product from '../models/model.product.mjs'

export const uploadSingleProduct = async (req, res, next) => {
  const file = req.file
  const { id } = req.params
  console.log(file.path)

  if (!file) {
    return res.status(400).json('Please upload a file')
  } else {
    const data = await Product.findById(id)
    if (!data) return notFoundError(res)
    else {
      data.mainImage = file.path
      await data.save()
      res.json('Upload success')
    }
  }

  next()
}

export const uploadMultiProduct = async (req, res, next) => {
  const files = req.files
  const { id } = req.params
  if (!files) {
    return res.status(400).json('Please upload a file')
  } else {
    const data = await Product.findById(id)
    if (!data) return notFoundError(res)
    else {
      data.images = files.map(file => file.path)
      await data.save()
      res.json('Upload success')
    }
  }

  next()
}
