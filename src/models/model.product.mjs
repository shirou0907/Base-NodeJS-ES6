import mongoose from 'mongoose'
const { Schema } = mongoose

const CommentSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'customer' },
  rate: { type: Number, required: true, default: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
})

const ProductModel = new Schema(
  {
    name: { type: String, required: true },
    code: String,
    description: String,
    tag: { type: [String], default: [] },
    attributes: { type: [Object], default: [] },
    options: { type: [Object], default: [] },
    images: { type: [String], default: [] },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    weight: Number,
    height: Number,
    width: Number,
    length: Number,
    comments: [CommentSchema],
  },
  {
    timestamps: true,
    collection: 'product',
  }
)

export default mongoose.model('product', ProductModel)
