import mongoose from 'mongoose'
const { Schema } = mongoose

const OrderDetailSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
)

const OrderSchema = new Schema(
  {
    status: { type: Number, default: 0 },
    orderDetail: [OrderDetailSchema],
    shipment: { type: Schema.Types.ObjectId, ref: 'shipment' },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: 'order',
  }
)

export default mongoose.model('order', OrderSchema)
