import mongoose from 'mongoose'
const { Schema } = mongoose

const TagModel = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'tag',
  }
)

export default mongoose.model('tag', TagModel)
