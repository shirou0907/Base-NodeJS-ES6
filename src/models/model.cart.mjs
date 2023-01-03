import mongoose from 'mongoose'
const { Schema } = mongoose

const ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product',
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const CartSchema = new Schema(
  {
    products: [ItemSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
    },
    total: {
      type: Number,
      default: 0,
    },
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
    collection: 'cart',
  }
)
export default mongoose.model('cart', CartSchema)
