import mongoose from 'mongoose'
const { Schema } = mongoose

const ThemeModel = new Schema(
  {
    lightMainColor: { type: String, required: true },
    darkMainColor: { type: String, required: true },
    slideImages: { type: Array, required: true },
    bannerTop: { type: String, required: true },
    bannerBottom: { type: String, required: true },
    logo: { type: String, required: true },
    fontFamily: { type: String, required: true },
    favicon: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'theme',
  }
)

export default mongoose.model('theme', ThemeModel)
