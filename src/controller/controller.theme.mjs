import Themes from '../models/model.theme.mjs'
import { getErrorMessages } from '../helper/errror.mjs'

const { invalidError, serverError } = getErrorMessages()

export const getThemeStyle = async (req, res) => {
  try {
    const themes = await Themes.find({})
    if (!themes) return res.status(404).send({ status: false, message: 'Themes not found' })
    return res.status(200).send({ status: true, data: themes[0] })
  } catch (error) {
    console.log(error)
    return serverError(res)
  }
}

export const updateThemeStyle = async (req, res) => {
  const { lightMainColor, darkMainColor, fontFamily, favicon } = req.body

  try {
    const themes = await Themes.updateMany({}, { lightMainColor, darkMainColor, fontFamily, favicon })
    if (!themes) return res.status(404).send({ status: false, message: 'Themes not found' })
    return res.status(200).send({ status: true, data: themes })
  } catch (error) {
    return serverError(res)
  }
}
