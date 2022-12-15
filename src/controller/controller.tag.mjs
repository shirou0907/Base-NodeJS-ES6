import Tag from '../models/model.tag.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const getAllTag = async (req, res) => {
  let { page = 1, size = 2, orderBy = 'updatedAt', sort = 'desc' } = req.query
  page = parseInt(page)
  size = parseInt(size)

  try {
    const tags = await Tag.find({})
      .skip((page - 1) * size)
      .limit(size)
      .sort({ [orderBy]: sort })

    const totalRecord = await Tag.find({}).estimatedDocumentCount()
    if (!tags) return res.status(404).send({ status: false, message: 'Tags not found' })
    return res.status(200).send({ status: true, data: tags, total: totalRecord })
  } catch (error) {
    console.log(error)
    return serverError(res)
  }
}

export const addNewTag = async (req, res) => {
  const { name, description = '' } = req.body
  if (!name) {
    return invalidError(res)
  }
  try {
    const data = await Tag.create({
      name,
      description,
    })
    if (data) {
      return res.json({
        data,
        message: 'Thêm tag thành công',
      })
    }
  } catch (error) {
    return serverError(res)
  }
}

export const updateTag = async (req, res) => {
  const { id } = req.params
  const { name, description = '' } = req.body
  if (!name) {
    return invalidError(res)
  }
  try {
    const data = await Tag.findByIdAndUpdate(id, { name, description })
    if (data) {
      return res.json({
        data,
        message: 'Cập nhật tag thành công',
      })
    }
  } catch (error) {
    return serverError(res)
  }
}

export const enableTag = async (req, res) => {
  const { id } = req.params
  try {
    const tag = await Tag.findByIdAndUpdate(id, { active: true })
    if (!tag) return res.status(404).send({ status: false, message: 'Tag not found' })
    return res.status(200).send({ status: true, message: 'Tag enable!' })
  } catch (error) {
    return serverError(res)
  }
}

export const disableTag = async (req, res) => {
  const { id } = req.params
  try {
    const tag = await Tag.findByIdAndUpdate(id, { active: false })
    if (!tag) return res.status(404).send({ status: false, message: 'Tag not found' })
    return res.status(200).send({ status: true, message: 'Tag disable!' })
  } catch (error) {
    return serverError(res)
  }
}
